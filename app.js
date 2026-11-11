var CONFIG = {
  colores: { Marte: "#f1f2f3", Luna: "#aeb6be" },
  variables: [
    { campo: "elevacion_m", nombre: "Elevación", unidad: "m", min: -200, max: 6000 },
    { campo: "pendiente_grados", nombre: "Pendiente", unidad: "°", min: 0, max: 30 },
    { campo: "rugosidad", nombre: "Rugosidad", unidad: "/100", min: 0, max: 100 },
    { campo: "temp_media_c", nombre: "Temperatura", unidad: "°C", min: -30, max: 40 },
    { campo: "insolacion", nombre: "Insolación", unidad: "kWh/m²·día", min: 2, max: 8 }
  ],
  referencias: {
    Marte: { elevacion_m: 1500, pendiente_grados: 10, rugosidad: 50, temp_media_c: -15, insolacion: 4 },
    Luna: { elevacion_m: 2000, pendiente_grados: 14, rugosidad: 75, temp_media_c: -20, insolacion: 7 }
  },
  misiones: [
    { id: "general", nombre: "General", texto: "Todas las variables pesan igual.",
      pesos: { elevacion_m: 0.2, pendiente_grados: 0.2, rugosidad: 0.2, temp_media_c: 0.2, insolacion: 0.2 } },
    { id: "rover", nombre: "Rover", texto: "Un rover necesita terreno que se pueda recorrer: pesan más la pendiente y la rugosidad.",
      pesos: { elevacion_m: 0.05, pendiente_grados: 0.35, rugosidad: 0.4, temp_media_c: 0.1, insolacion: 0.1 } },
    { id: "habitat", nombre: "Hábitat", texto: "Una base habitada depende del clima: pesa más la temperatura.",
      pesos: { elevacion_m: 0.1, pendiente_grados: 0.1, rugosidad: 0.1, temp_media_c: 0.55, insolacion: 0.15 } },
    { id: "paneles", nombre: "Paneles", texto: "Los paneles solares necesitan luz: pesa más la insolación.",
      pesos: { elevacion_m: 0.15, pendiente_grados: 0.05, rugosidad: 0.05, temp_media_c: 0.15, insolacion: 0.6 } },
    { id: "aterrizaje", nombre: "Aterrizaje", texto: "Para posar una nave se busca suelo llano y poco rocoso: pesan la pendiente y la rugosidad.",
      pesos: { elevacion_m: 0.05, pendiente_grados: 0.45, rugosidad: 0.4, temp_media_c: 0.05, insolacion: 0.05 } }
  ],
  categorias: [
    { id: "Todos", nombre: "Todos" },
    { id: "Famoso", nombre: "Famosos" },
    { id: "Poco conocido", nombre: "Poco conocidos" },
    { id: "Ecuador", nombre: "Ecuador" }
  ],
  giroVelocidad: 0.4,
  vistaInicial: { lat: -5, lng: -75, altitude: 2.3 },
  altitudZoom: 0.5,
  altitudSitio: 0.02,
  mosaico: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    nivelMax: 15,
    credito: "Imágenes: Esri, Maxar, Earthstar Geographics"
  },
  duracionZoom: 1500,
  imagenTierra: "lib/img/tierra.jpg",
  imagenRelieve: "lib/img/relieve.jpg",
  colorBrillo: "#8fa6bd"
};

var todos = LUGARES;
var mision = CONFIG.misiones[0];
var cuerpo = "Todos";
var categoria = "Todos";
var seleccionado = null;
var visibles = [];

function normalizar(v, x) {
  return (x - v.min) / (v.max - v.min);
}

function calcular(d, m) {
  var ref = CONFIG.referencias[d.referencia];
  var partes = CONFIG.variables.map(function (v) {
    var dif = Math.abs(normalizar(v, d[v.campo]) - normalizar(v, ref[v.campo]));
    return { v: v, valor: d[v.campo], ref: ref[v.campo], peso: m.pesos[v.campo], cercania: 1 - Math.min(dif, 1) };
  });
  var perdida = partes.reduce(function (a, p) { return a + p.peso * (1 - p.cercania); }, 0);
  d.puntaje = Math.round(100 * (1 - perdida));
  d.partes = partes;
}

function recalcular() {
  todos.forEach(function (d) { calcular(d, mision); });
}

function ordenados() {
  return visibles.slice().sort(function (a, b) { return b.puntaje - a.puntaje; });
}

function filtrar() {
  visibles = todos.filter(function (d) {
    return (cuerpo === "Todos" || d.referencia === cuerpo) && (categoria === "Todos" || d.categoria === categoria);
  });
}

function dibujarResumen() {
  var lista = ordenados();
  var mejor = lista[0];
  document.getElementById("resumen").innerHTML = mejor ?
    "<b>" + lista.length + "</b> lugares · mejor para " + mision.nombre.toLowerCase() + ": <b>" + mejor.nombre + "</b>" :
    "No hay lugares con este filtro.";
}

function dibujarChips() {
  var c = document.getElementById("cats");
  c.innerHTML = "";
  CONFIG.categorias.forEach(function (k) {
    var chip = document.createElement("div");
    chip.className = "chip" + (categoria === k.id ? " activa" : "");
    chip.textContent = k.nombre;
    chip.onclick = function () {
      categoria = k.id;
      if (seleccionado && categoria !== "Todos" && seleccionado.categoria !== categoria) { volver(); }
      actualizar();
    };
    c.appendChild(chip);
  });
}

function dibujarLista() {
  var cont = document.getElementById("lista");
  cont.innerHTML = "";
  ordenados().forEach(function (d, i) {
    var color = CONFIG.colores[d.referencia];
    var fila = document.createElement("div");
    fila.className = "fila" + (seleccionado && seleccionado.id === d.id ? " activa" : "");
    fila.innerHTML = '<div class="arriba"><span class="rango">' + ("0" + (i + 1)).slice(-2) + '</span><i class="punto" style="background:' + color + '"></i><span class="nombre">' + d.nombre + '</span><span class="num">' + d.puntaje + '</span></div>' +
      '<div class="sub2">' + d.pais.toUpperCase() + '</div>' +
      '<div class="mini"><div style="width:' + d.puntaje + '%;background:' + color + '"></div></div>';
    fila.onclick = function () { elegir(d, true); };
    cont.appendChild(fila);
  });
}

function dibujarMision() {
  var b = document.getElementById("botones");
  b.innerHTML = "";
  CONFIG.misiones.forEach(function (m, i) {
    var el = document.createElement("div");
    el.className = "botonm" + (m.id === mision.id ? " activa" : "");
    el.textContent = m.nombre;
    el.title = "Tecla " + (i + 1);
    el.onclick = function () { cambiarMision(m); };
    b.appendChild(el);
  });
  document.getElementById("textomision").textContent = mision.texto;
}

function cambiarMision(m) {
  mision = m;
  recalcular();
  dibujarMision();
  actualizar();
}

function actualizar() {
  filtrar();
  dibujarChips();
  dibujarResumen();
  dibujarLista();
  pintarMarcas();
  if (seleccionado) { fichaDe(seleccionado); } else { inicio(); }
}

function barraPeso(v) {
  var pct = Math.round(mision.pesos[v.campo] * 100);
  return '<div class="fila3"><span>' + v.nombre + '</span><div class="barra"><div style="width:' + pct + '%"></div></div><span class="pct">' + pct + '%</span></div>';
}

function inicio() {
  var mejor = ordenados()[0];
  var html = '<div class="ptit">Misión</div><div class="grande">' + mision.nombre + '</div>' +
    '<div class="pais">' + mision.texto + '</div>' +
    '<div class="ptit" style="margin-top:22px">Qué pesa más en el puntaje</div><div class="pesos">' +
    CONFIG.variables.map(barraPeso).join("") + '</div>';
  if (mejor) {
    html += '<div class="ptit" style="margin-top:22px">Mejor lugar</div><div class="mejor" id="mejor"><span class="n1">' + mejor.nombre + '</span><span class="n2">' + mejor.puntaje + '</span></div>';
  }
  html += '<div class="formula">PUNTAJE = 100 × (1 − Σ peso × diferencia)<br>La diferencia es entre el lugar y la referencia de ' + (cuerpo === "Todos" ? "Marte o la Luna" : cuerpo) + '.</div>' +
    '<div class="ayuda">Toca un punto del globo o un lugar de la lista.<br>Teclas: ↑ ↓ cambian de lugar · 1 a 5 cambian de misión · Esc vuelve.</div>';
  document.getElementById("detalle").innerHTML = html;
  var m = document.getElementById("mejor");
  if (m) { m.onclick = function () { elegir(mejor, true); }; }
}

function fichaDe(d) {
  var color = CONFIG.colores[d.referencia];
  var radio = 32, c = 2 * Math.PI * radio, lleno = c * d.puntaje / 100;
  var filas = d.partes.map(function (p) {
    return '<div class="var"><div class="fila2"><span>' + p.v.nombre + '</span><b>' + p.valor + ' ' + p.v.unidad + ' · ref. ' + p.ref + '</b></div>' +
      '<div class="tira"><div style="width:' + Math.round(p.cercania * 100) + '%"></div></div>' +
      '<div class="peso">PARECIDO ' + Math.round(p.cercania * 100) + '% · PESO ' + Math.round(p.peso * 100) + '%</div></div>';
  }).join("");
  var tags = d.probar.split(", ").map(function (t) {
    return '<span class="tag' + (t === mision.nombre ? " on" : "") + '">' + t.toUpperCase() + '</span>';
  }).join("");
  document.getElementById("detalle").innerHTML =
    '<div class="ptit">Ficha del lugar</div>' +
    '<div class="grande">' + d.nombre + '</div>' +
    '<div class="pais">' + d.pais + ' · ' + d.categoria + '</div>' +
    '<div class="datos"><span>LATITUD<b>' + Number(d.lat).toFixed(2) + '</b></span><span>LONGITUD<b>' + Number(d.lon).toFixed(2) + '</b></span><span>CONFIANZA<b>' + d.confianza + '</b></span></div>' +
    '<div class="puntaje"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"></circle>' +
    '<circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-dasharray="' + lleno + ' ' + (c - lleno) + '" transform="rotate(-90 40 40)"></circle>' +
    '<text x="40" y="48" text-anchor="middle" class="num">' + d.puntaje + '</text></svg>' +
    '<div><div class="t1">SIMILITUD CON ' + d.referencia.toUpperCase() + '</div><div class="t2">Misión: ' + mision.nombre + '</div></div></div>' +
    filas +
    '<div class="bloque"><span class="et">Se parece en</span>' + d.se_parece_en + '</div>' +
    '<div class="bloque"><span class="et">No se parece en</span>' + d.no_se_parece_en + '</div>' +
    '<div class="bloque"><span class="et">Cómo ayuda</span>' + d.como_ayuda + '</div>' +
    '<div class="bloque"><span class="et">Qué se puede probar aquí</span><div class="tags">' + tags + '</div></div>' +
    '<button onclick="acercar()">VER EL SITIO DE CERCA</button>' +
    '<button onclick="volver()" style="margin-top:10px">VOLVER AL PLANETA</button>';
}

function elegir(d, mover) {
  seleccionado = d;
  mundo.controls().autoRotate = false;
  if (mover) { mundo.pointOfView({ lat: d.lat, lng: d.lon, altitude: CONFIG.altitudZoom }, CONFIG.duracionZoom); }
  pintarMarcas();
  dibujarLista();
  fichaDe(d);
}

function acercar() {
  if (!seleccionado) { return; }
  mundo.controls().autoRotate = false;
  mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: CONFIG.altitudSitio }, 2000);
}

function volver() {
  var lon = seleccionado ? seleccionado.lon : CONFIG.vistaInicial.lng;
  seleccionado = null;
  pintarMarcas();
  dibujarLista();
  inicio();
  mundo.pointOfView({ lat: CONFIG.vistaInicial.lat, lng: lon, altitude: CONFIG.vistaInicial.altitude }, CONFIG.duracionZoom);
  setTimeout(function () { if (!seleccionado) { mundo.controls().autoRotate = true; } }, CONFIG.duracionZoom + 100);
}

function tamano(d) {
  return Math.round(12 + 14 * (d.puntaje / 100));
}

function crearMarca(d) {
  var el = document.createElement("div");
  var t = tamano(d);
  el.className = "marca " + d.referencia.toLowerCase() + (seleccionado && seleccionado.id === d.id ? " sel" : "");
  el.style.width = t + "px";
  el.style.height = t + "px";
  el.setAttribute("data-tip", d.nombre + " · " + d.puntaje + "/100");
  el.datosLugar = d;
  el.onclick = function (e) { e.stopPropagation(); elegir(d, true); };
  return el;
}

function refrescarMarcas() {
  document.querySelectorAll(".marca").forEach(function (el) {
    var d = el.datosLugar;
    if (!d) { return; }
    var t = tamano(d);
    el.style.width = t + "px";
    el.style.height = t + "px";
    el.setAttribute("data-tip", d.nombre + " · " + d.puntaje + "/100");
    el.classList.toggle("sel", !!(seleccionado && seleccionado.id === d.id));
  });
}

function pintarMarcas() {
  mundo.htmlElementsData(visibles.slice());
  refrescarMarcas();
}

var mundo = Globe()(document.getElementById("globo"))
  .backgroundColor("#050607")
  .globeImageUrl(CONFIG.imagenTierra)
  .bumpImageUrl(CONFIG.imagenRelieve)
  .showAtmosphere(true)
  .atmosphereColor(CONFIG.colorBrillo)
  .atmosphereAltitude(0.1)
  .htmlLat("lat")
  .htmlLng("lon")
  .htmlAltitude(0.004)
  .htmlElement(crearMarca)
  .htmlElementVisibilityModifier(function (el, visible) {
    el.style.opacity = visible ? 1 : 0;
    el.style.pointerEvents = visible ? "auto" : "none";
  });

mundo.globeMaterial().bumpScale = 3;
var radioTierra = 6371;
var creditoActivo = "";

function activarMosaico() {
  var prueba = new Image();
  prueba.crossOrigin = "anonymous";
  prueba.onload = function () {
    mundo.globeTileEngineUrl(function (x, y, nivel) {
      return CONFIG.mosaico.url.replace("{z}", nivel).replace("{y}", y).replace("{x}", x);
    });
    mundo.globeTileEngineMaxLevel(CONFIG.mosaico.nivelMax);
    creditoActivo = " · " + CONFIG.mosaico.credito;
  };
  prueba.src = CONFIG.mosaico.url.replace("{z}", 2).replace("{y}", 1).replace("{x}", 1);
}

function ajustarGiro() {
  var d = mundo.camera().position.length();
  mundo.controls().rotateSpeed = Math.max(0.03, Math.min(1, (d - 100) / 200));
}

mundo.controls().minDistance = 101.5;
mundo.controls().addEventListener("change", ajustarGiro);
activarMosaico();

mundo.controls().autoRotate = true;
mundo.controls().autoRotateSpeed = CONFIG.giroVelocidad;
mundo.pointOfView(CONFIG.vistaInicial, 0);

function ajustar() {
  var c = document.getElementById("globo");
  mundo.width(c.clientWidth).height(c.clientHeight);
}
window.addEventListener("resize", ajustar);
ajustar();

document.querySelectorAll(".tab").forEach(function (t) {
  t.onclick = function () {
    document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("activa"); });
    t.classList.add("activa");
    cuerpo = t.getAttribute("data-f");
    if (seleccionado && cuerpo !== "Todos" && seleccionado.referencia !== cuerpo) { volver(); }
    actualizar();
  };
});

var altitudMeta = 1;
var ultimaRueda = 0;
document.getElementById("globo").addEventListener("wheel", function (e) {
  if (!seleccionado) { return; }
  e.preventDefault();
  e.stopPropagation();
  var ahora = Date.now();
  if (ahora - ultimaRueda > 500) { altitudMeta = mundo.pointOfView().altitude; }
  ultimaRueda = ahora;
  altitudMeta = Math.max(0.015, Math.min(3, altitudMeta * Math.exp(e.deltaY * 0.0015)));
  mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: altitudMeta }, 220);
}, { passive: false, capture: true });

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") { volver(); return; }
  var n = Number(e.key);
  if (n >= 1 && n <= CONFIG.misiones.length) { cambiarMision(CONFIG.misiones[n - 1]); return; }
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    var lista = ordenados();
    if (!lista.length) { return; }
    var i = seleccionado ? lista.findIndex(function (d) { return d.id === seleccionado.id; }) : -1;
    i = e.key === "ArrowDown" ? Math.min(i + 1, lista.length - 1) : Math.max(i - 1, 0);
    elegir(lista[i], true);
    e.preventDefault();
  }
});

function seguir() {
  var trazo = document.getElementById("trazo");
  var ancla = document.getElementById("ancla");
  if (seleccionado) {
    var p = mundo.getScreenCoords(seleccionado.lat, seleccionado.lon, 0.004);
    var g = document.getElementById("globo").getBoundingClientRect();
    var panel = document.getElementById("detalle").getBoundingClientRect();
    if (p && p.x !== undefined) {
      var x = g.left + p.x, y = g.top + p.y;
      var xf = panel.left, yf = panel.top + 44;
      trazo.setAttribute("d", "M" + x + "," + y + " L" + (x + (xf - x) * 0.5) + "," + y + " L" + xf + "," + yf);
      trazo.setAttribute("opacity", 0.7);
      ancla.setAttribute("cx", x);
      ancla.setAttribute("cy", y);
      ancla.setAttribute("opacity", 0.9);
    }
  } else {
    trazo.setAttribute("opacity", 0);
    ancla.setAttribute("opacity", 0);
  }
  var km = Math.round(mundo.pointOfView().altitude * radioTierra);
  var texto = "ALTITUD " + km.toLocaleString("es-EC") + " KM" + creditoActivo;
  var alt = document.getElementById("alt");
  if (alt.textContent !== texto) { alt.textContent = texto; }
  requestAnimationFrame(seguir);
}

function leerCsv(texto) {
  var filas = [], fila = [], campo = "", entre = false;
  for (var i = 0; i < texto.length; i++) {
    var c = texto[i];
    if (entre) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') { entre = false; }
      else { campo += c; }
    } else if (c === '"') { entre = true; }
    else if (c === ",") { fila.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") { i++; }
      fila.push(campo); campo = "";
      if (fila.length > 1 || fila[0] !== "") { filas.push(fila); }
      fila = [];
    } else { campo += c; }
  }
  if (campo !== "" || fila.length) { fila.push(campo); filas.push(fila); }
  var cabecera = filas.shift();
  var numericos = ["id", "lat", "lon", "elevacion_m", "pendiente_grados", "rugosidad", "temp_media_c", "insolacion"];
  return filas.map(function (f) {
    var d = {};
    cabecera.forEach(function (nombre, k) {
      var v = (f[k] || "").trim();
      d[nombre.trim()] = numericos.indexOf(nombre.trim()) >= 0 ? Number(v) : v;
    });
    return d;
  });
}

function iniciar() {
  recalcular();
  dibujarMision();
  actualizar();
  seguir();
}

fetch("datos/lugares.csv")
  .then(function (r) { if (!r.ok) { throw new Error("sin csv"); } return r.text(); })
  .then(function (t) { var datos = leerCsv(t); if (datos.length) { todos = datos; } iniciar(); })
  .catch(function () { iniciar(); });
