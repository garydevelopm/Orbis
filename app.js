var CONFIG = {
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
    { id: "rover", nombre: "Rover", imagen: "",
      texto: "Un rover necesita terreno que se pueda recorrer.",
      uso: "Probar un vehículo y su navegación autónoma.",
      pesos: { elevacion_m: 0.05, pendiente_grados: 0.35, rugosidad: 0.4, temp_media_c: 0.1, insolacion: 0.1 } },
    { id: "habitat", nombre: "Hábitat", imagen: "",
      texto: "Una base habitada depende del clima.",
      uso: "Ensayar la vida de una tripulación en una base.",
      pesos: { elevacion_m: 0.1, pendiente_grados: 0.1, rugosidad: 0.1, temp_media_c: 0.55, insolacion: 0.15 } },
    { id: "paneles", nombre: "Paneles", imagen: "",
      texto: "Los paneles solares necesitan mucha luz.",
      uso: "Medir cuánta energía darían los paneles solares.",
      pesos: { elevacion_m: 0.15, pendiente_grados: 0.05, rugosidad: 0.05, temp_media_c: 0.15, insolacion: 0.6 } },
    { id: "aterrizaje", nombre: "Aterrizaje", imagen: "",
      texto: "Una nave necesita suelo llano y poco rocoso.",
      uso: "Practicar el descenso y el posado de una nave.",
      pesos: { elevacion_m: 0.05, pendiente_grados: 0.45, rugosidad: 0.4, temp_media_c: 0.05, insolacion: 0.05 } },
    { id: "perforacion", nombre: "Perforación", imagen: "",
      texto: "Buscar agua y hielo bajo el suelo exige frío y terreno firme.",
      uso: "Ensayar un taladro que extrae muestras del subsuelo.",
      pesos: { elevacion_m: 0.1, pendiente_grados: 0.2, rugosidad: 0.25, temp_media_c: 0.35, insolacion: 0.1 } }
  ],
  cuerpos: ["Todos", "Marte", "Luna"],
  categorias: [
    { id: "Todos", nombre: "Todos" },
    { id: "Famoso", nombre: "Famosos" },
    { id: "Poco conocido", nombre: "Poco conocidos" },
    { id: "Ecuador", nombre: "Ecuador" }
  ],
  giroVelocidad: 0.35,
  vistaInicial: { lat: -5, lng: -75, altitude: 2.3 },
  altitudZoom: 0.3,
  altitudSitio: 0.02,
  imagenTierra: "lib/img/tierra.jpg",
  imagenRelieve: "lib/img/relieve.jpg",
  imagenCielo: "lib/img/estrellas.jpg",
  colorBrillo: "#8fa6bd",
  mosaico: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    nivelMax: 15,
    credito: "Imágenes: Esri, Maxar, Earthstar Geographics"
  }
};

var ICONOS = {
  rover: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="36" y="32" width="48" height="14" rx="2"/><path d="M42 32l5-9h26l5 9"/><path d="M76 23V12h9"/><rect x="83" y="8" width="10" height="7" rx="1"/><circle cx="43" cy="53" r="6"/><circle cx="60" cy="53" r="6"/><circle cx="77" cy="53" r="6"/><path d="M14 62h92" stroke-dasharray="2 4"/></svg>',
  habitat: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M28 56a32 32 0 0 1 64 0z"/><path d="M54 56V45a6 6 0 0 1 12 0v11"/><circle cx="42" cy="44" r="2.5"/><circle cx="78" cy="44" r="2.5"/><rect x="92" y="46" width="14" height="10"/><path d="M14 62h92" stroke-dasharray="2 4"/></svg>',
  paneles: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M26 46l18-26h58l-18 26z"/><path d="M35 33h58M58 20L42 46M72 20L56 46M86 20L70 46"/><path d="M56 46v12M72 46v12M44 58h40"/><circle cx="12" cy="12" r="4"/></svg>',
  aterrizaje: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M48 24h24l6 14H42z"/><path d="M44 38l-14 20M76 38l14 20M52 38v20M68 38v20"/><path d="M24 58h12M84 58h12M46 58h12M62 58h12"/><path d="M12 62h96"/><path d="M54 14v6M60 8v12M66 14v6" stroke-dasharray="2 3"/></svg>',
  perforacion: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M52 8h16M60 8v34"/><path d="M54 14l12 4M54 22l12 4M54 30l12 4"/><path d="M60 42l-5 8h10z"/><rect x="48" y="4" width="24" height="6" rx="1"/><path d="M14 42h92"/><path d="M20 52h24M76 52h24M30 62h60" stroke-dasharray="2 4"/></svg>'
};

var todos = typeof LUGARES !== "undefined" ? LUGARES : [];
var mision = CONFIG.misiones[0];
var cuerpo = "Todos";
var categoria = "Todos";
var seleccionado = null;
var visibles = [];
var ventanaActual = null;
var rotando = true;
var radioTierra = 6371;
var creditoActivo = "";

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

function filtrar() {
  visibles = todos.filter(function (d) {
    return (cuerpo === "Todos" || d.referencia === cuerpo) && (categoria === "Todos" || d.categoria === categoria);
  });
}

function ordenados() {
  return visibles.slice().sort(function (a, b) { return b.puntaje - a.puntaje; });
}

function chev() {
  return '<svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg>';
}

function chip(accion, valor, texto, activa) {
  return '<button class="chip' + (activa ? " activa" : "") + '" data-accion="' + accion + '" data-valor="' + valor + '">' + texto + '</button>';
}

function ventanaLugares() {
  var chipsCuerpo = CONFIG.cuerpos.map(function (c) {
    var punto = c === "Todos" ? "" : '<i class="punto ' + c.toLowerCase() + '"></i>';
    return chip("cuerpo", c, punto + c, cuerpo === c);
  }).join("");
  var chipsCat = CONFIG.categorias.map(function (c) { return chip("categoria", c.id, c.nombre, categoria === c.id); }).join("");
  var lista = ordenados();
  var filas = lista.map(function (d, i) {
    return '<button class="fila" data-accion="lugar" data-valor="' + d.id + '"><span class="rango">' + ("0" + (i + 1)).slice(-2) + '</span>' +
      '<i class="punto ' + d.referencia.toLowerCase() + '"></i><span class="cuerpo"><span class="nombre">' + d.nombre + '</span><span class="pais">' + d.pais + '</span></span>' +
      '<span class="num">' + d.puntaje + '</span></button>';
  }).join("");
  if (!filas) { filas = '<p class="texto">No hay lugares con este filtro.</p>'; }
  var titulo = mision.id === "custom" ? "Parámetros personalizados" : "Misión · " + mision.nombre;
  return '<div class="criterio"><div><span class="etq">Ordenado por</span><b>' + titulo + '</b><span class="det">' + pesaTexto(mision) + '</span></div>' +
    '<button class="cambiar" data-accion="abrir-mision">Cambiar</button></div>' +
    '<div class="grupo"><span class="etq">Cuerpo</span><div class="chips">' + chipsCuerpo + '</div></div>' +
    '<div class="grupo"><span class="etq">Tipo</span><div class="chips">' + chipsCat + '</div></div>' +
    '<div class="encabezado"><span>' + lista.length + ' sitios</span><span>Similitud (0–100)</span></div>' + filas;
}

function ventanaMetodo() {
  var filas = CONFIG.variables.map(function (v) {
    return '<tr><td class="n">' + v.nombre + '</td><td>' + v.min + ' a ' + v.max + (v.unidad === "/100" ? "" : " " + v.unidad) + '</td><td>' + CONFIG.referencias.Marte[v.campo] + '</td><td>' + CONFIG.referencias.Luna[v.campo] + '</td></tr>';
  }).join("");
  return '<p class="texto">ORBIS compara cada lugar de la Tierra con una referencia de Marte o de la Luna y resume el parecido en un número de 0 a 100.</p>' +
    '<div class="formula">Puntaje = 100 × (1 − Σ peso × diferencia)</div>' +
    '<ol class="pasos"><li>Cada variable se lleva a una escala de 0 a 1 con su rango.</li><li>Se mide la diferencia entre el lugar y la referencia.</li><li>Cada diferencia se multiplica por el peso que tiene en la misión elegida.</li><li>Se suman y se restan de 100: cuanto más cerca de 100, más parecido.</li></ol>' +
    '<div class="sub">Variables y referencias</div><table><tr><th>Variable</th><th>Rango</th><th>Marte</th><th>Luna</th></tr>' + filas + '</table>' +
    '<p class="nota">El puntaje mide parecido según las variables elegidas. No es una probabilidad ni una prueba científica.</p>';
}

function ventanaFuentes() {
  var filas = [
    ["Elevación", "Modelos digitales de elevación (NASA SRTM, Copernicus DEM)"],
    ["Pendiente y rugosidad", "Se calculan a partir del modelo de elevación"],
    ["Temperatura", "Datos de clima y de superficie (NASA Earthdata)"],
    ["Insolación", "Datos de radiación solar (NASA POWER)"],
    ["Referencia de la Luna", "Mapas de la misión LRO (instrumento LOLA)"],
    ["Referencia de Marte", "Mapas de la misión MGS (instrumento MOLA)"]
  ].map(function (f) { return '<tr><td class="n">' + f[0] + '</td><td>' + f[1] + '</td></tr>'; }).join("");
  return '<p class="texto">Fuentes previstas para los valores reales de cada variable. Cada dato se anotará con su origen y su fecha.</p>' +
    '<table><tr><th>Dato</th><th>Fuente prevista</th></tr>' + filas + '</table>' +
    '<div class="sub">Visualización</div><p class="texto">Textura de la Tierra: NASA Blue Marble. Globo 3D: globe.gl sobre Three.js.</p>';
}

function ventanaLimites() {
  var filas = [
    ["Gravedad", "9,8 m/s²", "3,7 m/s²", "1,6 m/s²"],
    ["Atmósfera", "Densa y respirable", "Muy fina (menos del 1 % de la presión terrestre)", "Casi inexistente"],
    ["Radiación", "Protegida por la atmósfera y el campo magnético", "Mucho mayor", "Mucho mayor"],
    ["Polvo y suelo", "Suelo con humedad y vida", "Polvo fino y rojizo", "Regolito muy abrasivo"],
    ["Día y noche", "24 horas", "Casi 24 h 40 min", "Cerca de 29,5 días"]
  ].map(function (f) { return '<tr><td class="n">' + f[0] + '</td><td>' + f[1] + '</td><td>' + f[2] + '</td><td>' + f[3] + '</td></tr>'; }).join("");
  return '<p class="texto">Ningún lugar de la Tierra reproduce todo lo que ocurre en Marte o en la Luna. Estas son las diferencias que el puntaje no mide.</p>' +
    '<table><tr><th>Factor</th><th>Tierra</th><th>Marte</th><th>Luna</th></tr>' + filas + '</table>' +
    '<p class="nota">Por eso cada ficha indica en qué no se parece el lugar y qué tan confiable es su dato.</p>';
}

function ventanaProyecto() {
  return '<p class="texto"><b>ORBIS</b> es un simulador 3D de selección de sitios análogos: muestra qué lugares de la Tierra sirven para ensayar misiones a la Luna y a Marte.</p>' +
    '<p class="texto">Proyecto del NASA Space Apps Challenge 2026 (Guayaquil), reto "Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars".</p>' +
    '<div class="sub">Cómo usarlo</div><ol class="pasos"><li>Gira el planeta y toca un punto rojo.</li><li>Elige el tipo de misión en el menú Misión.</li><li>En la ficha, abre "Ver el sitio de cerca".</li></ol>' +
    '<div class="sub">Atajos de teclado</div><p class="texto">↑ ↓ cambian de lugar · 1 a 5 cambian de misión · Esc cierra.</p>' +
    '<div class="sub">Equipo</div><p class="texto">Por completar.</p>';
}

var pestana = "proyecto";
var PESTANAS = [
  { id: "proyecto", nombre: "Proyecto", html: ventanaProyecto },
  { id: "metodo", nombre: "Método", html: ventanaMetodo },
  { id: "fuentes", nombre: "Fuentes", html: ventanaFuentes },
  { id: "limites", nombre: "Límites", html: ventanaLimites }
];

function ventanaAcerca() {
  var barra = PESTANAS.map(function (p) {
    return '<button class="pestana' + (p.id === pestana ? " activa" : "") + '" data-accion="pestana" data-valor="' + p.id + '">' + p.nombre + '</button>';
  }).join("");
  var actual = PESTANAS.filter(function (p) { return p.id === pestana; })[0];
  return '<div class="pestanas">' + barra + '</div>' + actual.html();
}

function pesaTexto(m) {
  var vals = CONFIG.variables.map(function (v) { return { n: v.nombre, p: m.pesos[v.campo] }; });
  var iguales = vals.every(function (x) { return x.p === vals[0].p; });
  if (iguales) { return "Todas por igual"; }
  return vals.sort(function (a, b) { return b.p - a.p; }).slice(0, 2).map(function (x) { return x.n + " " + Math.round(x.p * 100) + "%"; }).join(" · ");
}

function ventanaMision() {
  var tarjetas = CONFIG.misiones.map(function (m) {
    var dibujo = m.imagen ? '<img src="' + m.imagen + '" alt="' + m.nombre + '">' : ICONOS[m.id];
    return '<button class="tarjeta' + (m.id === mision.id ? " activa" : "") + '" data-accion="mision" data-valor="' + m.id + '">' +
      '<div class="dibujo">' + dibujo + '</div><h3>' + m.nombre + '</h3><p>' + m.texto + '</p><p class="uso">' + m.uso + '</p><div class="pesa">' + pesaTexto(m) + '</div></button>';
  }).join("");
  if (mision.id !== "custom") {
    CONFIG.variables.forEach(function (v) { crudos[v.campo] = Math.round(mision.pesos[v.campo] * 100); });
  }
  return '<div class="tarjetas">' + tarjetas + '</div>' + panelPersonal();
}

var crudos = {};

function pesosDesdeCrudos() {
  var suma = CONFIG.variables.reduce(function (a, v) { return a + crudos[v.campo]; }, 0);
  var p = {};
  CONFIG.variables.forEach(function (v) { p[v.campo] = suma > 0 ? crudos[v.campo] / suma : 1 / CONFIG.variables.length; });
  return p;
}

function panelPersonal() {
  var p = pesosDesdeCrudos();
  var filas = CONFIG.variables.map(function (v) {
    return '<label class="deslizador"><span class="dn">' + v.nombre + '</span>' +
      '<input type="range" min="0" max="100" step="1" value="' + crudos[v.campo] + '" data-campo="' + v.campo + '">' +
      '<span class="dp" data-pct="' + v.campo + '">' + Math.round(p[v.campo] * 100) + '%</span></label>';
  }).join("");
  return '<div class="personal' + (mision.id === "custom" ? " activa" : "") + '" id="personal">' +
    '<div class="ptop"><div><h3>Personalizada</h3><p>Ajusta los deslizadores y pulsa Actualizar para ver los sitios.</p></div>' +
    '<button class="igualar" data-accion="igualar">Igualar todo</button></div>' + filas +
    '<div class="pie"><button class="actualizar" data-accion="actualizar">Actualizar</button></div></div>';
}

function mostrarPorcentajes() {
  var p = pesosDesdeCrudos();
  CONFIG.variables.forEach(function (v) {
    var el = document.querySelector('[data-pct="' + v.campo + '"]');
    if (el) { el.textContent = Math.round(p[v.campo] * 100) + "%"; }
  });
}

function usarPersonalizada() {
  mision = { id: "custom", nombre: "Personalizada", pesos: pesosDesdeCrudos() };
  recalcular();
  etiquetaMision();
  pintarMarcas();
  pintarFicha();
  mostrarPorcentajes();
  document.querySelectorAll(".tarjeta").forEach(function (t) { t.classList.remove("activa"); });
  var cont = document.getElementById("personal");
  if (cont) { cont.classList.add("activa"); }
}

var VENTANAS = {
  lugares: { titulo: "Sitios análogos", clase: "menu", html: ventanaLugares },
  metodo: { titulo: "Método", clase: "menu", html: ventanaMetodo },
  fuentes: { titulo: "Fuentes", clase: "menu", html: ventanaFuentes },
  limites: { titulo: "Límites de la analogía", clase: "menu", html: ventanaLimites },
  acerca: { titulo: "Acerca de ORBIS", clase: "menu", html: ventanaAcerca },
  mision: { titulo: "¿Qué quieres probar?", clase: "menu ancho", html: ventanaMision }
};

function pintarVentana() {
  var v = VENTANAS[ventanaActual];
  var el = document.getElementById("ventana");
  var scroll = el.scrollTop;
  el.className = v.clase;
  el.innerHTML = '<div class="vtit"><h2>' + v.titulo + '</h2><button class="cerrar" data-accion="cerrar" aria-label="Cerrar">✕</button></div>' + v.html();
  el.scrollTop = scroll;
}

function marcarMenu() {
  document.querySelectorAll(".item").forEach(function (b) {
    b.classList.toggle("activa", b.getAttribute("data-v") === ventanaActual);
  });
}

function abrirVentana(nombre) {
  if (ventanaActual === nombre) { cerrarVentana(); return; }
  if (nombre === "acerca") { pestana = "proyecto"; }
  ventanaActual = nombre;
  pintarVentana();
  document.getElementById("ventana").classList.remove("oculta");
  marcarMenu();
}

function cerrarVentana() {
  ventanaActual = null;
  var el = document.getElementById("ventana");
  el.className = "oculta";
  el.innerHTML = "";
  marcarMenu();
}

function acordeon(titulo, cuerpoHtml) {
  return '<button class="acc" data-accion="acc">' + titulo + chev() + '</button><div class="acc-cuerpo">' + cuerpoHtml + '</div>';
}

function fichaHtml(d) {
  var radio = 32, c = 2 * Math.PI * radio, lleno = c * d.puntaje / 100;
  var desglose = d.partes.map(function (p) {
    return '<div class="var"><div class="f2"><span>' + p.v.nombre + '</span><b>' + p.valor + ' ' + p.v.unidad + ' · ref. ' + p.ref + '</b></div>' +
      '<div class="tira"><div style="width:' + Math.round(p.cercania * 100) + '%"></div></div><div class="pc">PARECIDO ' + Math.round(p.cercania * 100) + '%</div></div>';
  }).join("");
  var tags = d.probar.split(", ").map(function (t) {
    return '<span class="tag' + (t === mision.nombre ? " on" : "") + '">' + t + '</span>';
  }).join("");
  var datos = '<div class="datosfila"><span>Latitud</span><span>' + Number(d.lat).toFixed(2) + '</span></div>' +
    '<div class="datosfila"><span>Longitud</span><span>' + Number(d.lon).toFixed(2) + '</span></div>' +
    '<div class="datosfila"><span>Confianza del dato</span><span>' + d.confianza + '</span></div>';
  return '<div class="cab"><div><div class="tit">' + d.nombre + '</div><div class="meta">' + d.pais + ' · ' + d.categoria + '</div></div>' +
    '<button class="cerrar" data-accion="cerrar-ficha" aria-label="Cerrar ficha">✕</button></div>' +
    '<div class="puntaje"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></circle>' +
    '<circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="' + lleno + ' ' + (c - lleno) + '" transform="rotate(-90 40 40)"></circle>' +
    '<text x="40" y="48" text-anchor="middle" class="num">' + d.puntaje + '</text></svg>' +
    '<div><div class="t1">SIMILITUD CON ' + d.referencia.toUpperCase() + '</div><div class="t2">Misión: ' + mision.nombre + '</div></div></div>' +
    acordeon("Desglose del puntaje", desglose) +
    acordeon("Se parece en", d.se_parece_en) +
    acordeon("No se parece en", d.no_se_parece_en) +
    acordeon("Cómo ayuda", d.como_ayuda) +
    acordeon("Qué se puede probar", '<div class="tags">' + tags + '</div>') +
    acordeon("Datos del sitio", datos) +
    '<button class="boton" data-accion="acercar">VER EL SITIO DE CERCA</button>';
}

var fichaVisible = false;

function sincronizarFicha(visible) {
  if (visible === fichaVisible) { return; }
  fichaVisible = visible;
  document.body.classList.toggle("con-ficha", visible);
  if (typeof ajustar === "function" && typeof mundo !== "undefined") { ajustar(); }
}

function pintarFicha() {
  var f = document.getElementById("ficha");
  sincronizarFicha(!!seleccionado);
  if (!seleccionado) { f.classList.add("oculta"); f.innerHTML = ""; return; }
  var abiertos = [];
  f.querySelectorAll(".acc.abierto").forEach(function (b) { abiertos.push(b.textContent.trim()); });
  f.innerHTML = fichaHtml(seleccionado);
  f.querySelectorAll(".acc").forEach(function (b) {
    if (abiertos.indexOf(b.textContent.trim()) >= 0) { b.classList.add("abierto"); b.nextElementSibling.classList.add("abierto"); }
  });
  f.classList.remove("oculta");
}

function tamano(d) {
  return Math.round(8 + 6 * (d.puntaje / 100));
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

function iconoRotacion() {
  var b = document.getElementById("rotacion");
  b.innerHTML = rotando ?
    '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 3v10M11 3v10" stroke="currentColor" stroke-width="2" fill="none"></path></svg>' :
    '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 3l8 5-8 5z" fill="currentColor"></path></svg>';
  b.title = rotando ? "Pausar rotación" : "Reanudar rotación";
}

function alternarRotacion() {
  rotando = !rotando;
  if (!seleccionado) { mundo.controls().autoRotate = rotando; }
  iconoRotacion();
}

function elegir(d, mover) {
  seleccionado = d;
  mundo.controls().autoRotate = false;
  if (ventanaActual) { cerrarVentana(); }
  if (mover) { mundo.pointOfView({ lat: d.lat, lng: d.lon, altitude: CONFIG.altitudZoom }, CONFIG.duracionZoom || 1500); }
  pintarMarcas();
  pintarFicha();
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
  pintarFicha();
  mundo.pointOfView({ lat: CONFIG.vistaInicial.lat, lng: lon, altitude: CONFIG.vistaInicial.altitude }, 1500);
  setTimeout(function () { if (!seleccionado) { mundo.controls().autoRotate = rotando; } }, 1600);
}

function etiquetaMision() {
  document.getElementById("itemMision").textContent = "Misión · " + mision.nombre;
}

function cambiarMision(id) {
  mision = CONFIG.misiones.filter(function (m) { return m.id === id; })[0];
  recalcular();
  etiquetaMision();
  pintarMarcas();
  pintarFicha();
  if (ventanaActual) { pintarVentana(); }
}

function refiltrar() {
  filtrar();
  if (seleccionado && visibles.indexOf(seleccionado) < 0) { volver(); } else { pintarMarcas(); }
  if (ventanaActual) { pintarVentana(); }
}

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

var mundo = Globe()(document.getElementById("globo"))
  .backgroundColor("#050607")
  .backgroundImageUrl(CONFIG.imagenCielo)
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
  })
  .onGlobeClick(function () { cerrarMenuMovil(); if (ventanaActual) { cerrarVentana(); } });

mundo.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
mundo.globeMaterial().bumpScale = 3;
mundo.controls().autoRotate = true;
mundo.controls().autoRotateSpeed = CONFIG.giroVelocidad;
mundo.controls().minDistance = 101.5;
mundo.controls().addEventListener("change", ajustarGiro);
mundo.pointOfView(CONFIG.vistaInicial, 0);

function ajustar() {
  var c = document.getElementById("globo");
  mundo.width(c.clientWidth).height(c.clientHeight);
}
window.addEventListener("resize", ajustar);
ajustar();
activarMosaico();

var altitudMeta = 1;
var altitudActual = 1;
var animandoZoom = false;

function pasoZoom() {
  if (!seleccionado) { animandoZoom = false; return; }
  var dif = altitudMeta - altitudActual;
  if (Math.abs(dif) < altitudActual * 0.002) {
    altitudActual = altitudMeta;
    mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: altitudActual }, 0);
    animandoZoom = false;
    return;
  }
  altitudActual += dif * 0.18;
  mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: altitudActual }, 0);
  requestAnimationFrame(pasoZoom);
}

document.getElementById("globo").addEventListener("wheel", function (e) {
  if (!seleccionado) { return; }
  e.preventDefault();
  e.stopPropagation();
  if (!animandoZoom) { altitudActual = mundo.pointOfView().altitude; altitudMeta = altitudActual; }
  altitudMeta = Math.max(0.015, Math.min(3, altitudMeta * Math.exp(e.deltaY * 0.0015)));
  if (!animandoZoom) { animandoZoom = true; requestAnimationFrame(pasoZoom); }
}, { passive: false, capture: true });

document.querySelectorAll(".item").forEach(function (b) {
  b.onclick = function () { cerrarMenuMovil(); abrirVentana(b.getAttribute("data-v")); };
});

function cerrarMenuMovil() {
  document.getElementById("menu").classList.remove("abierto");
  document.getElementById("burger").setAttribute("aria-expanded", "false");
}
document.getElementById("burger").onclick = function () {
  var abierto = document.getElementById("menu").classList.toggle("abierto");
  this.setAttribute("aria-expanded", abierto ? "true" : "false");
};
document.getElementById("rotacion").onclick = alternarRotacion;

document.getElementById("ventana").addEventListener("click", function (e) {
  var b = e.target.closest("[data-accion]");
  if (!b) { return; }
  var a = b.getAttribute("data-accion");
  var v = b.getAttribute("data-valor");
  if (a === "cerrar") { cerrarVentana(); }
  else if (a === "cuerpo") { cuerpo = v; refiltrar(); }
  else if (a === "categoria") { categoria = v; refiltrar(); }
  else if (a === "lugar") { var d = todos.filter(function (x) { return String(x.id) === v; })[0]; if (d) { elegir(d, true); } }
  else if (a === "mision") { cambiarMision(v); cerrarVentana(); abrirVentana("lugares"); }
  else if (a === "pestana") { pestana = v; pintarVentana(); }
  else if (a === "abrir-mision") { cerrarVentana(); abrirVentana("mision"); }
  else if (a === "igualar") {
    CONFIG.variables.forEach(function (x) { crudos[x.campo] = 20; });
    document.querySelectorAll("#personal input").forEach(function (i) { i.value = 20; });
    mostrarPorcentajes();
  }
  else if (a === "actualizar") { usarPersonalizada(); cerrarVentana(); abrirVentana("lugares"); document.getElementById("ventana").scrollTop = 0; }
});

document.getElementById("ventana").addEventListener("input", function (e) {
  var c = e.target.getAttribute("data-campo");
  if (!c) { return; }
  crudos[c] = Number(e.target.value);
  mostrarPorcentajes();
});

document.getElementById("ficha").addEventListener("click", function (e) {
  var b = e.target.closest("[data-accion]");
  if (!b) { return; }
  var a = b.getAttribute("data-accion");
  if (a === "cerrar-ficha") { volver(); }
  else if (a === "acercar") { acercar(); }
  else if (a === "acc") { b.classList.toggle("abierto"); b.nextElementSibling.classList.toggle("abierto"); }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (ventanaActual) { cerrarVentana(); } else if (seleccionado) { volver(); }
    return;
  }
  var n = Number(e.key);
  if (n >= 1 && n <= CONFIG.misiones.length) { cambiarMision(CONFIG.misiones[n - 1].id); return; }
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    var lista = ordenados();
    if (!lista.length) { return; }
    var i = seleccionado ? lista.indexOf(seleccionado) : -1;
    i = e.key === "ArrowDown" ? Math.min(i + 1, lista.length - 1) : Math.max(i - 1, 0);
    elegir(lista[i], true);
    e.preventDefault();
  }
});

function ocultarPista() {
  document.getElementById("pista").classList.add("fuera");
}
document.addEventListener("pointerdown", ocultarPista, { once: true });
setTimeout(ocultarPista, 9000);

function seguir() {
  var trazo = document.getElementById("trazo");
  var ancla = document.getElementById("ancla");
  var ficha = document.getElementById("ficha");
  if (seleccionado && !ficha.classList.contains("oculta")) {
    var p = mundo.getScreenCoords(seleccionado.lat, seleccionado.lon, 0.004);
    if (p && p.x !== undefined) {
      var x = p.x, y = p.y;
      var xf = window.innerWidth - 28 - ficha.offsetWidth, yf = 84 + 36;
      trazo.setAttribute("d", "M" + x + "," + y + " L" + (x + (xf - x) * 0.5) + "," + y + " L" + xf + "," + yf);
      trazo.setAttribute("opacity", 0.6);
      ancla.setAttribute("cx", x);
      ancla.setAttribute("cy", y);
      ancla.setAttribute("opacity", 0);
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
  filtrar();
  etiquetaMision();
  iconoRotacion();
  pintarMarcas();
  seguir();
}

fetch("datos/lugares.csv")
  .then(function (r) { if (!r.ok) { throw new Error("sin csv"); } return r.text(); })
  .then(function (t) { var datos = leerCsv(t); if (datos.length) { todos = datos; } iniciar(); })
  .catch(function () { iniciar(); });
