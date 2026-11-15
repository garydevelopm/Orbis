var CONFIG = {
  variables: [
    { campo: "elevacion_m", get nombre() { return T("Elevación"); }, unidad: "m", min: -200, max: 6000 },
    { campo: "pendiente_grados", get nombre() { return T("Pendiente"); }, unidad: "°", min: 0, max: 30 },
    { campo: "rugosidad", get nombre() { return T("Rugosidad"); }, unidad: "/100", min: 0, max: 100 },
    { campo: "temp_media_c", get nombre() { return T("Temperatura"); }, unidad: "°C", min: -30, max: 40 },
    { campo: "insolacion", get nombre() { return T("Insolación"); }, get unidad() { return T("kWh/m²·día"); }, min: 2, max: 8 }
  ],
  referencias: {
    Marte: { elevacion_m: 1500, pendiente_grados: 10, rugosidad: 50, temp_media_c: -15, insolacion: 4 },
    Luna: { elevacion_m: 2000, pendiente_grados: 14, rugosidad: 75, temp_media_c: -20, insolacion: 7 }
  },
  misiones: [
    { id: "rover", nombre: "Rover", imagen: "",
      get texto() { return T("Un rover necesita terreno que se pueda recorrer."); },
      get uso() { return T("Probar un vehículo y su navegación autónoma."); },
      pesos: { elevacion_m: 0.05, pendiente_grados: 0.35, rugosidad: 0.4, temp_media_c: 0.1, insolacion: 0.1 } },
    { id: "habitat", get nombre() { return T("Hábitat"); }, imagen: "",
      get texto() { return T("Una base habitada depende del clima."); },
      get uso() { return T("Ensayar la vida de una tripulación en una base."); },
      pesos: { elevacion_m: 0.1, pendiente_grados: 0.1, rugosidad: 0.1, temp_media_c: 0.55, insolacion: 0.15 } },
    { id: "paneles", get nombre() { return T("Paneles"); }, imagen: "",
      get texto() { return T("Los paneles solares necesitan mucha luz."); },
      get uso() { return T("Medir cuánta energía darían los paneles solares."); },
      pesos: { elevacion_m: 0.15, pendiente_grados: 0.05, rugosidad: 0.05, temp_media_c: 0.15, insolacion: 0.6 } },
    { id: "aterrizaje", get nombre() { return T("Aterrizaje"); }, imagen: "",
      get texto() { return T("Una nave necesita suelo llano y poco rocoso."); },
      get uso() { return T("Practicar el descenso y el posado de una nave."); },
      pesos: { elevacion_m: 0.05, pendiente_grados: 0.45, rugosidad: 0.4, temp_media_c: 0.05, insolacion: 0.05 } },
    { id: "perforacion", get nombre() { return T("Perforación"); }, imagen: "",
      get texto() { return T("Buscar agua y hielo bajo el suelo exige frío y terreno firme."); },
      get uso() { return T("Ensayar un taladro que extrae muestras del subsuelo."); },
      pesos: { elevacion_m: 0.1, pendiente_grados: 0.2, rugosidad: 0.25, temp_media_c: 0.35, insolacion: 0.1 } }
  ],
  objetivos: [
    { id: "general", get nombre() { return T("Referencias generales"); }, etiqueta: "General", cuerpo: "Todos", icono: "objGeneral", ref: null, provisional: false,
      get texto() { return T("Marte y la Luna con una referencia general para cada uno."); },
      get fuente() { return T("Una referencia por cuerpo"); } },
    { id: "luna-polo", get nombre() { return T("Luna · Polo sur"); }, get etiqueta() { return T("Luna · Polo sur"); }, cuerpo: "Luna", icono: "objLunaPolo", ref: null, provisional: true,
      get texto() { return T("Región del polo sur lunar donde NASA planea la base Artemis."); },
      get fuente() { return T("Fuente prevista: LOLA y Diviner (misión LRO)"); } },
    { id: "marte-arcadia", get nombre() { return T("Marte · Arcadia Planitia"); }, get etiqueta() { return T("Marte · Arcadia"); }, cuerpo: "Marte", icono: "objArcadia", ref: null, provisional: true,
      get texto() { return T("Llanura de latitudes medias del norte, con hielo bajo el suelo."); },
      get fuente() { return T("Fuente prevista: MOLA y CTX"); } },
    { id: "marte-deuteronilus", get nombre() { return T("Marte · Deuteronilus Mensae"); }, get etiqueta() { return T("Marte · Deuteronilus"); }, cuerpo: "Marte", icono: "objDeuteronilus", ref: null, provisional: true,
      get texto() { return T("Valles con glaciares en las latitudes medias del norte."); },
      get fuente() { return T("Fuente prevista: MOLA y CTX"); } }
  ],
  cuerpos: ["Todos", "Marte", "Luna"],
  categorias: [
    { id: "Todos", get nombre() { return T("Todos"); } },
    { id: "Famoso", get nombre() { return T("Famosos"); } },
    { id: "Poco conocido", get nombre() { return T("Poco conocidos"); } },
    { id: "Ecuador", nombre: "Ecuador" }
  ],
  giroVelocidad: 0.35,
  vistaInicial: { lat: -5, lng: -75, altitude: 2.3 },
  altitudZoom: 0.3,
  altitudSitio: 0.007,
  imagenTierra: "lib/img/tierra.jpg",
  imagenRelieve: "lib/img/relieve.jpg",
  imagenCielo: "lib/img/estrellas.jpg",
  colorBrillo: "#8fa6bd",
  mosaico: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    nivelMax: 15,
    get credito() { return T("Imágenes: Esri, Maxar, Earthstar Geographics"); }
  },
  foto: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export",
    anchoMetros: 14000,
    ancho: 640,
    alto: 320,
    get credito() { return T("Imagen satelital: Esri, Maxar, Earthstar Geographics"); }
  },
  vistas: [
    { get etiqueta() { return T("Región"); }, metros: 160000 },
    { get etiqueta() { return T("Zona"); }, metros: 14000 },
    { get etiqueta() { return T("Detalle"); }, metros: 2500 }
  ]
};

var ICONOS = {
  rover: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="36" y="32" width="48" height="14" rx="2"/><path d="M42 32l5-9h26l5 9"/><path d="M76 23V12h9"/><rect x="83" y="8" width="10" height="7" rx="1"/><circle cx="43" cy="53" r="6"/><circle cx="60" cy="53" r="6"/><circle cx="77" cy="53" r="6"/><path d="M14 62h92" stroke-dasharray="2 4"/></svg>',
  habitat: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M28 56a32 32 0 0 1 64 0z"/><path d="M54 56V45a6 6 0 0 1 12 0v11"/><circle cx="42" cy="44" r="2.5"/><circle cx="78" cy="44" r="2.5"/><rect x="92" y="46" width="14" height="10"/><path d="M14 62h92" stroke-dasharray="2 4"/></svg>',
  paneles: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M26 46l18-26h58l-18 26z"/><path d="M35 33h58M58 20L42 46M72 20L56 46M86 20L70 46"/><path d="M56 46v12M72 46v12M44 58h40"/><circle cx="12" cy="12" r="4"/></svg>',
  aterrizaje: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M48 24h24l6 14H42z"/><path d="M44 38l-14 20M76 38l14 20M52 38v20M68 38v20"/><path d="M24 58h12M84 58h12M46 58h12M62 58h12"/><path d="M12 62h96"/><path d="M54 14v6M60 8v12M66 14v6" stroke-dasharray="2 3"/></svg>',
  objGeneral: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="44" cy="36" r="24"/><circle cx="90" cy="36" r="16"/><path d="M30 30h28M28 40h32M82 32h16M80 40h20"/></svg>',
  objLunaPolo: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="60" cy="40" r="26"/><ellipse cx="60" cy="22" rx="11" ry="4"/><path d="M60 14V3M60 3l7 3-7 3"/><circle cx="46" cy="44" r="4"/><circle cx="72" cy="48" r="5"/></svg>',
  objArcadia: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="60" cy="36" r="27"/><path d="M38 28h44M34 36h52M38 44h44"/><path d="M44 21h32" stroke-dasharray="2 4"/></svg>',
  objDeuteronilus: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="60" cy="36" r="27"/><path d="M36 48l9-14 6 8 7-16 8 16 6-8 10 14z"/></svg>',
  perforacion: '<svg viewBox="0 0 120 72" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M52 8h16M60 8v34"/><path d="M54 14l12 4M54 22l12 4M54 30l12 4"/><path d="M60 42l-5 8h10z"/><rect x="48" y="4" width="24" height="6" rx="1"/><path d="M14 42h92"/><path d="M20 52h24M76 52h24M30 62h60" stroke-dasharray="2 4"/></svg>'
};

var todos = typeof LUGARES !== "undefined" ? LUGARES : [];
var mision = CONFIG.misiones[0];
var objetivo = CONFIG.objetivos[0];
var cuerpo = "Todos";
var categoria = "Todos";
var seleccionado = null;
var visibles = [];
var ventanaActual = null;
var rotando = true;
var radioTierra = 6371;
var creditoActivo = "";
var vista = "tierra";
var comparando = false;
var contrapartes = [];
var mundo2 = null;
var mosaicoListo = false;
var ALT_MARCA = 0.001;
var fijarSitio = false;

function altitudMinima() {
  return vista === "tierra" ? 0.005 : vista === "luna" ? 0.03 : 0.016;
}

var TEXTURAS = {
  tierra: { img: CONFIG.imagenTierra, relieve: CONFIG.imagenRelieve, brillo: CONFIG.colorBrillo },
  marte: { img: "lib/img/marte.jpg", relieve: "lib/img/marte_relieve.jpg", brillo: "#d98a66", get credito() { return T("Solar System Scope (CC BY 4.0), datos de NASA"); } },
  luna: { img: "lib/img/luna.jpg", relieve: "lib/img/luna_relieve.jpg", brillo: "#aeb4bb", credito: "NASA Scientific Visualization Studio (LRO)" }
};

function armarContrapartes() {
  var lista = typeof CONTRAPARTES !== "undefined" ? CONTRAPARTES : [];
  contrapartes = lista.map(function (c) {
    var a = todos.filter(function (x) { return Number(x.id) === c.analogoId; })[0];
    if (!a) { return null; }
    var o = { id: "c" + c.analogoId, nombre: c.nombre, lat: c.lat, lon: c.lon, referencia: c.cuerpo, pais: c.cuerpo, categoria: "Contraparte",
      analogo: a, que_es: c.que_es, hito: c.hito, esContraparte: true };
    Object.defineProperty(o, "puntaje", { get: function () { return a.puntaje; } });
    return o;
  }).filter(function (x) { return x; });
}

function contrapartePara(d) {
  if (!d) { return null; }
  if (d.esContraparte) { return d; }
  return contrapartes.filter(function (c) { return c.analogo === d; })[0] || null;
}

function contrapartesDe(clave) {
  var nombre = clave === "marte" ? "Marte" : "Luna";
  return contrapartes.filter(function (c) { return c.referencia === nombre; });
}

function normalizar(v, x) {
  return (x - v.min) / (v.max - v.min);
}

function referenciaDe(nombreCuerpo) {
  if (objetivo.ref && objetivo.cuerpo === nombreCuerpo) { return objetivo.ref; }
  return CONFIG.referencias[nombreCuerpo];
}

function calcular(d, m) {
  var ref = referenciaDe(d.referencia);
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
    return chip("cuerpo", c, punto + T(c), cuerpo === c);
  }).join("");
  var chipsCat = CONFIG.categorias.map(function (c) { return chip("categoria", c.id, c.nombre, categoria === c.id); }).join("");
  var lista = ordenados();
  var filas = lista.map(function (d, i) {
    return '<button class="fila" data-accion="lugar" data-valor="' + d.id + '"><span class="rango">' + ("0" + (i + 1)).slice(-2) + '</span>' +
      '<i class="punto ' + d.referencia.toLowerCase() + '"></i><span class="cuerpo"><span class="nombre">' + d.nombre + '</span><span class="pais">' + d.pais + '</span></span>' +
      '<span class="num">' + d.puntaje + '</span></button>';
  }).join("");
  if (!filas) { filas = T('<p class="texto">No hay lugares con este filtro.</p>'); }
  var titulo = mision.id === "custom" ? T("Parámetros personalizados") : T("Misión · ") + mision.nombre;
  var detObjetivo = objetivo.provisional ? T("Valores por completar: por ahora usa la referencia general") : objetivo.fuente;
  return T('<div class="criterio"><div><span class="etq">Ordenado por</span><b>') + titulo + '</b><span class="det">' + pesaTexto(mision) + '</span></div>' +
    T('<button class="cambiar" data-accion="abrir-mision">Cambiar</button></div>') +
    T('<div class="criterio"><div><span class="etq">Comparado con</span><b>') + objetivo.nombre + '</b><span class="det">' + detObjetivo + '</span></div>' +
    T('<button class="cambiar" data-accion="abrir-objetivo">Cambiar</button></div>') +
    T('<div class="grupo"><span class="etq">Cuerpo</span><div class="chips">') + chipsCuerpo + '</div></div>' +
    T('<div class="grupo"><span class="etq">Tipo</span><div class="chips">') + chipsCat + '</div></div>' +
    '<div class="encabezado"><span>' + lista.length + T(' sitios</span><span>Similitud (0–100)</span></div>') + filas;
}

function ventanaMetodo() {
  var filas = CONFIG.variables.map(function (v) {
    return '<tr><td class="n">' + v.nombre + '</td><td>' + v.min + T(' a ') + v.max + (v.unidad === "/100" ? "" : " " + v.unidad) + '</td><td>' + CONFIG.referencias.Marte[v.campo] + '</td><td>' + CONFIG.referencias.Luna[v.campo] + '</td></tr>';
  }).join("");
  return T('<p class="texto">ORBIS compara cada lugar de la Tierra con una referencia de Marte o de la Luna y resume el parecido en un número de 0 a 100.</p>') +
    T('<div class="formula">Puntaje = 100 × (1 − Σ peso × diferencia)</div>') +
    T('<ol class="pasos"><li>Cada variable se lleva a una escala de 0 a 1 con su rango.</li><li>Se mide la diferencia entre el lugar y la referencia.</li><li>Cada diferencia se multiplica por el peso que tiene en la misión elegida.</li><li>Se suman y se restan de 100: cuanto más cerca de 100, más parecido.</li></ol>') +
    T('<div class="sub">Variables y referencias</div><table><tr><th>Variable</th><th>Rango</th><th>Marte</th><th>Luna</th></tr>') + filas + '</table>' +
    T('<p class="nota">El puntaje mide parecido según las variables elegidas. No es una probabilidad ni una prueba científica. En el menú Objetivo se puede comparar con un lugar concreto de Marte o de la Luna.</p>');
}

function ventanaFuentes() {
  var filas = [
    [T("Elevación"), T("Modelos digitales de elevación (NASA SRTM, Copernicus DEM)")],
    [T("Pendiente y rugosidad"), T("Se calculan a partir del modelo de elevación")],
    [T("Temperatura"), T("Datos de clima y de superficie (NASA Earthdata)")],
    [T("Insolación"), T("Datos de radiación solar (NASA POWER)")],
    [T("Referencia de la Luna"), T("Mapas de la misión LRO (instrumento LOLA)")],
    [T("Referencia de Marte"), T("Mapas de la misión MGS (instrumento MOLA)")]
  ].map(function (f) { return '<tr><td class="n">' + f[0] + '</td><td>' + f[1] + '</td></tr>'; }).join("");
  return T('<p class="texto">Fuentes previstas para los valores reales de cada variable. Cada dato se anotará con su origen y su fecha.</p>') +
    T('<table><tr><th>Dato</th><th>Fuente prevista</th></tr>') + filas + '</table>' +
    T('<div class="sub">Visualización</div><p class="texto">Textura de la Tierra: NASA Blue Marble. Globo 3D: globe.gl sobre Three.js.</p>');
}

function ventanaLimites() {
  var filas = [
    [T("Gravedad"), T("9,8 m/s²"), T("3,7 m/s²"), T("1,6 m/s²")],
    [T("Atmósfera"), T("Densa y respirable"), T("Muy fina (menos del 1 % de la presión terrestre)"), T("Casi inexistente")],
    [T("Radiación"), T("Protegida por la atmósfera y el campo magnético"), T("Mucho mayor"), T("Mucho mayor")],
    [T("Polvo y suelo"), T("Suelo con humedad y vida"), T("Polvo fino y rojizo"), T("Regolito muy abrasivo")],
    [T("Día y noche"), T("24 horas"), T("Casi 24 h 40 min"), T("Cerca de 29,5 días")]
  ].map(function (f) { return '<tr><td class="n">' + f[0] + '</td><td>' + f[1] + '</td><td>' + f[2] + '</td><td>' + f[3] + '</td></tr>'; }).join("");
  return T('<p class="texto">Ningún lugar de la Tierra reproduce todo lo que ocurre en Marte o en la Luna. Estas son las diferencias que el puntaje no mide.</p>') +
    T('<table><tr><th>Factor</th><th>Tierra</th><th>Marte</th><th>Luna</th></tr>') + filas + '</table>' +
    T('<p class="nota">Por eso cada ficha indica en qué no se parece el lugar y qué tan confiable es su dato.</p>');
}

function ventanaProyecto() {
  return T('<p class="texto"><b>ORBIS</b> es un simulador 3D de selección de sitios análogos: muestra qué lugares de la Tierra sirven para ensayar misiones a la Luna y a Marte.</p>') +
    T('<p class="texto">Proyecto del NASA Space Apps Challenge 2026 (Guayaquil), reto "Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars".</p>') +
    T('<div class="sub">Cómo usarlo</div><ol class="pasos"><li>Gira el planeta y toca un punto rojo.</li><li>Elige el tipo de misión en el menú Misión.</li><li>En la ficha, abre "Ver el sitio de cerca".</li></ol>') +
    T('<div class="sub">Atajos de teclado</div><p class="texto">↑ ↓ cambian de lugar · 1 a 5 cambian de misión · Esc cierra.</p>') +
    T('<div class="sub">Equipo</div><p class="texto">Por completar.</p>');
}

var pestana = "proyecto";
var PESTANAS = [
  { id: "proyecto", get nombre() { return T("Proyecto"); }, html: ventanaProyecto },
  { id: "metodo", get nombre() { return T("Método"); }, html: ventanaMetodo },
  { id: "fuentes", get nombre() { return T("Fuentes"); }, html: ventanaFuentes },
  { id: "limites", get nombre() { return T("Límites"); }, html: ventanaLimites }
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
  if (iguales) { return T("Todas por igual"); }
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

function ventanaObjetivo() {
  var tarjetas = CONFIG.objetivos.map(function (o) {
    return '<button class="tarjeta' + (o.id === objetivo.id ? " activa" : "") + '" data-accion="objetivo" data-valor="' + o.id + '">' +
      '<div class="dibujo">' + ICONOS[o.icono] + '</div><h3>' + o.nombre + '</h3><p>' + o.texto + '</p><p class="uso">' + o.fuente + '</p>' +
      '<div class="pesa">' + (o.provisional ? T("Valores por completar") : T("Valores de ejemplo")) + '</div></button>';
  }).join("");
  return T('<p class="texto">Elige el lugar de Marte o de la Luna con el que quieres comparar los sitios de la Tierra.</p><div class="tarjetas cuatro">') + tarjetas + '</div>' +
    T('<p class="nota">Los objetivos concretos usan la referencia general hasta que se carguen sus valores reales.</p>');
}

function etiquetaObjetivo() {
  document.getElementById("itemObjetivo").textContent = T("Objetivo · ") + objetivo.etiqueta;
}

function seleccionarObjetivo(id) {
  objetivo = CONFIG.objetivos.filter(function (o) { return o.id === id; })[0];
  cuerpo = objetivo.cuerpo;
  recalcular();
  filtrar();
  etiquetaObjetivo();
  if (seleccionado && visibles.indexOf(seleccionado) < 0) { volver(); } else { pintarMarcas(); pintarFicha(); }
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
    T('<div class="ptop"><div><h3>Personalizada</h3><p>Ajusta los deslizadores y pulsa Actualizar para ver los sitios.</p></div>') +
    T('<button class="igualar" data-accion="igualar">Igualar todo</button></div>') + filas +
    T('<div class="pie"><button class="actualizar" data-accion="actualizar">Actualizar</button></div></div>');
}

function mostrarPorcentajes() {
  var p = pesosDesdeCrudos();
  CONFIG.variables.forEach(function (v) {
    var el = document.querySelector('[data-pct="' + v.campo + '"]');
    if (el) { el.textContent = Math.round(p[v.campo] * 100) + "%"; }
  });
}

function usarPersonalizada() {
  mision = { id: "custom", get nombre() { return T("Personalizada"); }, pesos: pesosDesdeCrudos() };
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
  lugares: { get titulo() { return T("Sitios análogos"); }, clase: "menu", html: ventanaLugares },
  metodo: { get titulo() { return T("Método"); }, clase: "menu", html: ventanaMetodo },
  fuentes: { get titulo() { return T("Fuentes"); }, clase: "menu", html: ventanaFuentes },
  limites: { get titulo() { return T("Límites de la analogía"); }, clase: "menu", html: ventanaLimites },
  acerca: { get titulo() { return T("Acerca de ORBIS"); }, clase: "menu", html: ventanaAcerca },
  mision: { get titulo() { return T("¿Qué quieres probar?"); }, clase: "menu ancho", html: ventanaMision },
  objetivo: { get titulo() { return T("¿Con qué lugar comparar?"); }, clase: "menu ancho", html: ventanaObjetivo }
};

function pintarVentana() {
  var v = VENTANAS[ventanaActual];
  var el = document.getElementById("ventana");
  var scroll = el.scrollTop;
  el.className = v.clase;
  el.innerHTML = '<div class="vtit"><h2>' + v.titulo + T('</h2><button class="cerrar" data-accion="cerrar" aria-label="Cerrar">✕</button></div>') + v.html();
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

function urlFoto(d, metros, ancho, alto) {
  if (d.foto && !metros) { return d.foto; }
  var f = CONFIG.foto, R = 6378137;
  ancho = ancho || f.ancho;
  alto = alto || f.alto;
  var x = d.lon * Math.PI * R / 180;
  var y = Math.log(Math.tan(Math.PI / 4 + d.lat * Math.PI / 360)) * R;
  var mitad = (metros || f.anchoMetros) / 2 / Math.cos(d.lat * Math.PI / 180);
  var mitadAlto = mitad * alto / ancho;
  var caja = [x - mitad, y - mitadAlto, x + mitad, y + mitadAlto].map(Math.round).join(",");
  return f.url + "?bbox=" + caja + "&bboxSR=3857&imageSR=3857&size=" + ancho + "," + alto + "&format=jpg&f=image";
}

function vistasSitio(d) {
  var lista = (d.fotos || "").split("|").map(function (x) { return x.trim(); }).filter(function (x) { return x; });
  if (d.foto && lista.indexOf(d.foto) < 0) { lista.unshift(d.foto); }
  var propias = lista.map(function (x, i) {
    return { url: x, urlGrande: x, etiqueta: T("Foto ") + (i + 1), credito: d.fotos_credito || d.foto_credito || "" };
  });
  var satelitales = CONFIG.vistas.map(function (v) {
    return { url: urlFoto(d, v.metros), urlGrande: urlFoto(d, v.metros, 1600, 1000), etiqueta: v.etiqueta, credito: CONFIG.foto.credito };
  });
  return propias.length ? propias : propias.concat(satelitales);
}

function indiceBanner(d) {
  if (d.foto) { return 0; }
  var propias = vistasSitio(d).length - CONFIG.vistas.length;
  var z = 0;
  CONFIG.vistas.forEach(function (v, i) { if (v.metros === CONFIG.foto.anchoMetros) { z = i; } });
  return propias + z;
}

var galeriaVisible = false;
var galeriaIndice = 0;

function textoVista(v) {
  return '<b>' + v.etiqueta + '</b>' + (v.credito ? ' · ' + v.credito : "");
}

function pintarGaleria() {
  var g = document.getElementById("galeria");
  if (!galeriaVisible || !seleccionado) { g.classList.add("oculta"); g.innerHTML = ""; return; }
  var vistas = vistasSitio(seleccionado);
  if (galeriaIndice >= vistas.length) { galeriaIndice = 0; }
  var actual = vistas[galeriaIndice];
  var minis = vistas.map(function (v, i) {
    return '<button class="gmini' + (i === galeriaIndice ? " activa" : "") + '" data-accion="vista" data-valor="' + i + '"><img src="' + v.url + '" alt="" onerror="this.parentNode.style.display=\'none\'"><span>' + v.etiqueta + '</span></button>';
  }).join("");
  g.innerHTML = T('<div class="gtit">Vistas del sitio</div>') +
    '<figure class="gprincipal"><img id="gimagen" src="' + actual.url + '" alt="' + T('Vista de ') + seleccionado.nombre + '"><figcaption id="gpie">' + textoVista(actual) + '</figcaption></figure>' +
    '<div class="gminis">' + minis + '</div>';
  g.classList.remove("oculta");
}

var visorAbierto = false;
var visorIndice = 0;

function pintarVisor() {
  var vistas = vistasSitio(seleccionado);
  var v = vistas[visorIndice];
  var img = document.getElementById("vimg");
  var carga = document.getElementById("vcarga");
  carga.textContent = T("Cargando imagen…");
  carga.style.display = "block";
  img.style.opacity = 0.25;
  img.onload = function () { carga.style.display = "none"; img.style.opacity = 1; };
  img.onerror = function () { carga.textContent = T("No se pudo cargar la imagen"); };
  img.src = v.urlGrande;
  document.getElementById("vpie").innerHTML = textoVista(v) + (vistas.length > 1 ? ' · ' + (visorIndice + 1) + ' / ' + vistas.length : "");
  document.querySelector(".vant").style.display = vistas.length > 1 ? "" : "none";
  document.querySelector(".vsig").style.display = vistas.length > 1 ? "" : "none";
}

function abrirVisor(i) {
  if (!seleccionado) { return; }
  visorAbierto = true;
  visorIndice = i;
  pintarVisor();
  document.getElementById("visor").classList.remove("oculta");
}

function cerrarVisor() {
  visorAbierto = false;
  document.getElementById("visor").classList.add("oculta");
  document.getElementById("vimg").src = "";
}

function moverVisor(paso) {
  var n = vistasSitio(seleccionado).length;
  visorIndice = (visorIndice + paso + n) % n;
  pintarVisor();
  if (galeriaVisible && document.getElementById("gimagen")) { elegirVista(visorIndice); }
}

function elegirVista(i) {
  var vistas = vistasSitio(seleccionado);
  if (!vistas[i]) { return; }
  galeriaIndice = i;
  document.getElementById("gimagen").src = vistas[i].url;
  document.getElementById("gpie").innerHTML = textoVista(vistas[i]);
  document.querySelectorAll(".gmini").forEach(function (b, k) { b.classList.toggle("activa", k === i); });
}

function fotoHtml(d) {
  var credito = d.foto ? (d.foto_credito || "") : CONFIG.foto.credito;
  return '<figure class="foto" data-accion="visor" data-valor="' + indiceBanner(d) + '"><img src="' + urlFoto(d) + '" alt="' + T('Vista de ') + d.nombre + '" decoding="async" onerror="this.parentNode.classList.add(\'sinfoto\')">' +
    (credito ? '<figcaption>' + credito + '</figcaption>' : '') + '</figure>';
}

function botonSimilitud(d) {
  var c = contrapartePara(d);
  if (!c) { return ""; }
  return T('<button class="ver-sim" data-accion="similitud"><span>Ver similitud</span><small>con ') + c.nombre + '</small></button>';
}

function fichaCuerpoHtml(c) {
  var a = c.analogo;
  var radio = 32, k = 2 * Math.PI * radio, lleno = k * a.puntaje / 100;
  var filas = a.partes.map(function (p) {
    return '<tr><td class="n">' + p.v.nombre + '</td><td>' + p.valor + ' ' + p.v.unidad + '</td><td>' + p.ref + ' ' + p.v.unidad + '</td></tr>';
  }).join("");
  var tabla = '<table><tr><th>Variable</th><th>' + a.nombre + '</th><th>' + T(c.referencia) + ' (ref.)</th></tr>' + filas + '</table>' +
    T('<p class="nota">Valores de prueba: aún no son datos reales de ') + T(c.referencia) + '.</p>';
  var datos = T('<div class="datosfila"><span>Cuerpo</span><span>') + T(c.referencia) + '</span></div>' +
    T('<div class="datosfila"><span>Latitud</span><span>') + Number(c.lat).toFixed(2) + '</span></div>' +
    T('<div class="datosfila"><span>Longitud</span><span>') + Number(c.lon).toFixed(2) + '</span></div>';
  return '<div class="cab"><div><div class="tit">' + c.nombre + '</div><div class="meta">' + T(c.referencia) + T(' · Contraparte de ') + a.nombre + '</div></div>' +
    T('<button class="cerrar" data-accion="cerrar-ficha" aria-label="Cerrar ficha">✕</button></div>') +
    '<div class="puntaje"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></circle>' +
    '<circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="' + lleno + ' ' + (k - lleno) + '" transform="rotate(-90 40 40)"></circle>' +
    '<text x="40" y="48" text-anchor="middle" class="num">' + a.puntaje + '</text></svg>' +
    T('<div><div class="t1">PARECIDO CON ') + a.nombre.toUpperCase() + T('</div><div class="t2">Misión: ') + mision.nombre + '</div></div></div>' +
    acordeon(T("Qué es este lugar"), c.que_es) +
    acordeon(T("Qué se ha hecho aquí"), c.hito) +
    acordeon(T("Por qué se parece"), a.se_parece_en) +
    acordeon(T("Comparación de condiciones"), tabla) +
    acordeon(T("Datos del sitio"), datos) +
    T('<button class="boton" data-accion="acercar">VER ZONA ANALIZADA</button>') +
    T('<button class="boton" data-accion="similitud">VER SIMILITUD CON LA TIERRA</button>');
}

function fichaHtml(d) {
  var radio = 32, c = 2 * Math.PI * radio, lleno = c * d.puntaje / 100;
  var desglose = d.partes.map(function (p) {
    return '<div class="var"><div class="f2"><span>' + p.v.nombre + '</span><b>' + p.valor + ' ' + p.v.unidad + ' · ref. ' + p.ref + '</b></div>' +
      '<div class="tira"><div style="width:' + Math.round(p.cercania * 100) + T('%"></div></div><div class="pc">PARECIDO ') + Math.round(p.cercania * 100) + '%</div></div>';
  }).join("");
  var tags = d.probar.split(", ").map(function (t) {
    return '<span class="tag' + (t === NOMBRE_ES[mision.id] ? " on" : "") + '">' + T(t) + '</span>';
  }).join("");
  var datos = T('<div class="datosfila"><span>Latitud</span><span>') + Number(d.lat).toFixed(2) + '</span></div>' +
    T('<div class="datosfila"><span>Longitud</span><span>') + Number(d.lon).toFixed(2) + '</span></div>' +
    T('<div class="datosfila"><span>Confianza del dato</span><span>') + T(d.confianza) + '</span></div>' +
    (d.fuente ? T('<div class="datosfila"><span>Fuente</span><span>') + d.fuente + '</span></div>' : '') +
    (d.nota ? '<p class="nota">' + d.nota + '</p>' : '');
  return '<div class="cab"><div><div class="tit">' + d.nombre + '</div><div class="meta">' + d.pais + ' · ' + T(d.categoria) + '</div></div>' +
    T('<button class="cerrar" data-accion="cerrar-ficha" aria-label="Cerrar ficha">✕</button></div>') +
    fotoHtml(d) +
    '<div class="puntaje"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></circle>' +
    '<circle cx="40" cy="40" r="' + radio + '" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="' + lleno + ' ' + (c - lleno) + '" transform="rotate(-90 40 40)"></circle>' +
    '<text x="40" y="48" text-anchor="middle" class="num">' + d.puntaje + '</text></svg>' +
    T('<div><div class="t1">SIMILITUD CON ') + (!objetivo.provisional && objetivo.id !== "general" && objetivo.cuerpo === d.referencia ? objetivo.nombre : T(d.referencia)).toUpperCase() + T('</div><div class="t2">Misión: ') + mision.nombre + '</div></div></div>' +
    acordeon(T("Desglose del puntaje"), desglose) +
    acordeon(T("Se parece en"), d.se_parece_en + botonSimilitud(d)) +
    acordeon(T("No se parece en"), d.no_se_parece_en) +
    acordeon(T("Cómo ayuda"), d.como_ayuda) +
    acordeon(T("Qué se puede probar"), '<div class="tags">' + tags + '</div>') +
    acordeon(T("Datos del sitio"), datos) +
    T('<button class="boton" data-accion="acercar">VER EL SITIO DE CERCA</button>');
}

var fichaVisible = false;

function sincronizarFicha(visible) {
  if (visible === fichaVisible) { return; }
  fichaVisible = visible;
  document.body.classList.toggle("con-ficha", visible);
  if (typeof ajustar === "function" && typeof mundo !== "undefined") { ajustar(); }
}

function rellenarPanel(f, html) {
  var abiertos = [];
  f.querySelectorAll(".acc.abierto").forEach(function (b) { abiertos.push(b.textContent.trim()); });
  f.innerHTML = html;
  f.querySelectorAll(".acc").forEach(function (b) {
    if (abiertos.indexOf(b.textContent.trim()) >= 0) { b.classList.add("abierto"); b.nextElementSibling.classList.add("abierto"); }
  });
  f.classList.remove("oculta");
}

function abrirAcordeon(f, titulo) {
  f.querySelectorAll(".acc").forEach(function (b) {
    if (b.textContent.trim() === titulo) { b.classList.add("abierto"); b.nextElementSibling.classList.add("abierto"); }
  });
}

function pintarFicha() {
  var f = document.getElementById("ficha");
  var f2 = document.getElementById("ficha2");
  sincronizarFicha(!!seleccionado);
  if (!seleccionado) { f.classList.add("oculta"); f.innerHTML = ""; f2.classList.add("oculta"); f2.innerHTML = ""; return; }
  rellenarPanel(f, seleccionado.esContraparte ? fichaCuerpoHtml(seleccionado) : fichaHtml(seleccionado));
  var c = comparando ? contrapartePara(seleccionado) : null;
  if (c) { rellenarPanel(f2, fichaCuerpoHtml(c)); } else { f2.classList.add("oculta"); f2.innerHTML = ""; }
}

function tamano(d) {
  return Math.round(8 + 6 * (d.puntaje / 100));
}

function textoTip(d) {
  return d.esContraparte ? d.nombre + T(" · análogo: ") + d.analogo.nombre : d.nombre + " · " + d.puntaje + "/100";
}

function crearMarcaFija(d) {
  var el = document.createElement("div");
  var t = tamano(d) + 2;
  el.className = "marca sel " + d.referencia.toLowerCase();
  el.style.width = t + "px";
  el.style.height = t + "px";
  el.setAttribute("data-tip", d.nombre);
  return el;
}

function crearMarca(d) {
  var el = document.createElement("div");
  var t = tamano(d);
  el.className = "marca " + d.referencia.toLowerCase() + (seleccionado && seleccionado.id === d.id ? " sel" : "");
  el.style.width = t + "px";
  el.style.height = t + "px";
  el.setAttribute("data-tip", textoTip(d));
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
    el.setAttribute("data-tip", textoTip(d));
    el.classList.toggle("sel", !!(seleccionado && seleccionado.id === d.id));
  });
}

function pintarMarcas() {
  mundo.htmlElementsData((vista === "tierra" ? visibles : contrapartesDe(vista)).slice());
  refrescarMarcas();
}

function iconoRotacion() {
  var b = document.getElementById("rotacion");
  b.innerHTML = rotando ?
    '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 3v10M11 3v10" stroke="currentColor" stroke-width="2" fill="none"></path></svg>' :
    '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 3l8 5-8 5z" fill="currentColor"></path></svg>';
  b.title = rotando ? T("Pausar rotación") : T("Reanudar rotación");
}

function alternarRotacion() {
  rotando = !rotando;
  if (!seleccionado) { mundo.controls().autoRotate = rotando; }
  iconoRotacion();
}

var ignorarAvisoHasta = 0;

function altitudObjetivo(d) {
  if (comparando) { return altitudCaber(mundo.width(), mundo.height()); }
  return d && d.esContraparte ? 0.55 : CONFIG.altitudZoom;
}

function elegir(d, mover) {
  if (!d.esContraparte && vista !== "tierra") { cambiarVista("tierra"); }
  cerrarVisor();
  seleccionado = d;
  galeriaVisible = false;
  galeriaIndice = 0;
  pintarGaleria();
  mundo.controls().autoRotate = false;
  mundo.controls().staticMoving = true;
  fijarSitio = true;
  if (ventanaActual) { cerrarVentana(); }
  detenerZoom();
  ignorarAvisoHasta = Date.now() + (CONFIG.duracionZoom || 1500) + 300;
  if (mover) { mundo.pointOfView({ lat: d.lat, lng: d.lon, altitude: altitudObjetivo(d) }, CONFIG.duracionZoom || 1500); }
  pintarMarcas();
  if (comparando && !d.esContraparte) { actualizarComparacion(); } else { pintarFicha(); }
}

function acercar() {
  if (!seleccionado || comparando) { return; }
  var cuerpoSel = !!seleccionado.esContraparte;
  mundo.controls().autoRotate = false;
  detenerZoom();
  ignorarAvisoHasta = Date.now() + 2300;
  var alt = cuerpoSel ? altitudMinima() * 1.15 : CONFIG.altitudSitio;
  mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: alt }, 2000);
  if (!cuerpoSel) {
    galeriaVisible = true;
    pintarGaleria();
  }
}

function volver() {
  detenerZoom();
  fijarSitio = false;
  mundo.controls().staticMoving = false;
  if (comparando) { salirComparacion(); }
  cerrarVisor();
  var lon = seleccionado ? seleccionado.lon : CONFIG.vistaInicial.lng;
  seleccionado = null;
  galeriaVisible = false;
  pintarGaleria();
  pintarMarcas();
  pintarFicha();
  mundo.pointOfView({ lat: CONFIG.vistaInicial.lat, lng: lon, altitude: CONFIG.vistaInicial.altitude }, 1500);
  setTimeout(function () { if (!seleccionado) { mundo.controls().autoRotate = rotando; } }, 1600);
}

function etiquetaMision() {
  document.getElementById("itemMision").textContent = T("Misión · ") + mision.nombre;
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

function usarMosaico(activo) {
  if (activo && mosaicoListo) {
    mundo.globeTileEngineUrl(function (x, y, nivel) {
      return CONFIG.mosaico.url.replace("{z}", nivel).replace("{y}", y).replace("{x}", x);
    });
    mundo.globeTileEngineMaxLevel(CONFIG.mosaico.nivelMax);
    creditoActivo = " · " + CONFIG.mosaico.credito;
  } else {
    mundo.globeTileEngineUrl(null);
    creditoActivo = TEXTURAS[vista] && TEXTURAS[vista].credito ? " · " + TEXTURAS[vista].credito : "";
  }
}

function activarMosaico() {
  var prueba = new Image();
  prueba.crossOrigin = "anonymous";
  prueba.onload = function () { mosaicoListo = true; usarMosaico(vista === "tierra"); };
  prueba.src = CONFIG.mosaico.url.replace("{z}", 2).replace("{y}", 1).replace("{x}", 1);
}

function aplicarCuerpo(g, clave) {
  var t = TEXTURAS[clave];
  g.globeImageUrl(t.img).bumpImageUrl(t.relieve).atmosphereColor(t.brillo);
}

function marcarCuerpos() {
  document.querySelectorAll("#cuerpos button").forEach(function (b) {
    b.classList.toggle("activa", b.getAttribute("data-c") === vista);
    b.setAttribute("aria-pressed", b.getAttribute("data-c") === vista ? "true" : "false");
  });
}

function actualizarAviso() {
  var t = (vista === "tierra" && !comparando) ? T("DATOS NASA · PROMEDIO DEL TILE 1° × 1°") : T("REFERENCIAS DE MARTE Y LUNA: DATOS DE PRUEBA");
  var a = document.getElementById("aviso");
  if (a.textContent !== t) { a.textContent = t; }
}

function cambiarVista(clave) {
  if (clave === vista && !comparando) { return; }
  if (comparando) { salirComparacion(); }
  vista = clave;
  aplicarCuerpo(mundo, clave);
  usarMosaico(clave === "tierra");
  mundo.controls().minDistance = 100 * (1 + altitudMinima());
  marcarCuerpos();
  volver();
  actualizarAviso();
}

function altitudCaber(w, h) {
  if (!w || !h) { return 1; }
  var lado = Math.min(w, h) * 0.92;
  var s = (lado / h) * Math.tan(25 * Math.PI / 180);
  var d = Math.sqrt(1 + 1 / (s * s));
  return Math.max(0.35, d - 1);
}

function crearMundo2() {
  mundo2 = Globe()(document.getElementById("globo2"))
    .backgroundColor("#050607")
    .backgroundImageUrl(CONFIG.imagenCielo)
    .showAtmosphere(true)
    .atmosphereAltitude(0.1)
    .htmlLat("lat")
    .htmlLng("lon")
    .htmlAltitude(0.004)
    .htmlElement(crearMarcaFija)
    .htmlElementVisibilityModifier(function (el, visible) { el.style.opacity = visible ? 1 : 0; });
  mundo2.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  mundo2.globeMaterial().bumpScale = 3;
  mundo2.controls().autoRotate = false;
  mundo2.controls().minDistance = 100 * (1 + 0.2);
  mundo2.controls().addEventListener("change", function () {
    var d = mundo2.camera().position.length();
    mundo2.controls().rotateSpeed = Math.max(0.03, Math.min(1, (d - 100) / 200));
  });
}

function actualizarComparacion() {
  var c = contrapartePara(seleccionado);
  if (!c) { salirComparacion(); return; }
  var a = c.analogo;
  aplicarCuerpo(mundo2, c.referencia === "Marte" ? "marte" : "luna");
  mundo2.htmlElementsData([c]);
  var alt = altitudCaber(mundo2.width(), mundo2.height());
  mundo2.pointOfView({ lat: c.lat, lng: c.lon, altitude: alt }, 0);
  document.getElementById("etq1").textContent = T("Tierra · ") + a.nombre;
  document.getElementById("etq2").textContent = T(c.referencia) + " · " + c.nombre;
  document.getElementById("tab2").textContent = T(c.referencia);
  pintarFicha();
  abrirAcordeon(document.getElementById("ficha"), T("Se parece en"));
  abrirAcordeon(document.getElementById("ficha2"), T("Qué es este lugar"));
  document.getElementById("ficha").scrollTop = 0;
  document.getElementById("ficha2").scrollTop = 0;
}

function reencuadrar() {
  if (!comparando || !mundo2) { return; }
  var v = mundo.pointOfView();
  mundo.pointOfView({ lat: v.lat, lng: v.lng, altitude: altitudCaber(mundo.width(), mundo.height()) }, 0);
  var v2 = mundo2.pointOfView();
  mundo2.pointOfView({ lat: v2.lat, lng: v2.lng, altitude: altitudCaber(mundo2.width(), mundo2.height()) }, 0);
}

function compararSimilitud() {
  var base = seleccionado;
  var c = contrapartePara(base);
  if (!c) { return; }
  var a = c.analogo;
  if (vista !== "tierra") { cambiarVista("tierra"); }
  if (!mundo2) { crearMundo2(); }
  comparando = true;
  document.body.classList.remove("ver-b");
  document.body.classList.add("comparando");
  ajustar();
  mundo2.resumeAnimation();
  mundo.controls().autoRotate = false;
  detenerZoom();
  seleccionado = a;
  actualizarAviso();
  pintarMarcas();
  mundo.pointOfView({ lat: a.lat, lng: a.lon, altitude: altitudCaber(mundo.width(), mundo.height()) }, 1200);
  actualizarComparacion();
}

function salirComparacion() {
  if (!comparando) { return; }
  comparando = false;
  document.body.classList.remove("comparando", "ver-b");
  actualizarAviso();
  if (mundo2) { mundo2.htmlElementsData([]); mundo2.pauseAnimation(); }
  document.getElementById("ficha2").classList.add("oculta");
  ajustar();
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
  .htmlAltitude(ALT_MARCA)
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
mundo.controls().minDistance = 100.5;
mundo.controls().addEventListener("change", ajustarGiro);
mundo.pointOfView(CONFIG.vistaInicial, 0);

function ajustar() {
  var c = document.getElementById("globo");
  mundo.width(c.clientWidth).height(c.clientHeight);
  if (mundo2) {
    var c2 = document.getElementById("globo2");
    mundo2.width(c2.clientWidth).height(c2.clientHeight);
  }
  reencuadrar();
}
window.addEventListener("resize", ajustar);
ajustar();
activarMosaico();

var altitudMeta = 1;
var altitudActual = 1;
var animandoZoom = false;
var idZoom = 0;

function detenerZoom() {
  cancelAnimationFrame(idZoom);
  animandoZoom = false;
}

function centroZoom() {
  if (seleccionado && !comparando) { return { lat: seleccionado.lat, lng: seleccionado.lon }; }
  var v = mundo.pointOfView();
  return { lat: v.lat, lng: v.lng };
}

function pasoZoom() {
  var dif = altitudMeta - altitudActual;
  var centro = centroZoom();
  if (Math.abs(dif) < altitudActual * 0.002) {
    altitudActual = altitudMeta;
    mundo.pointOfView({ lat: centro.lat, lng: centro.lng, altitude: altitudActual }, 0);
    animandoZoom = false;
    return;
  }
  altitudActual += dif * 0.18;
  mundo.pointOfView({ lat: centro.lat, lng: centro.lng, altitude: altitudActual }, 0);
  idZoom = requestAnimationFrame(pasoZoom);
}

function zoomBoton(factor) {
  if (!animandoZoom) { altitudActual = mundo.pointOfView().altitude; altitudMeta = altitudActual; }
  altitudMeta = Math.max(altitudMinima(), Math.min(4, altitudMeta * factor));
  if (!animandoZoom) { animandoZoom = true; idZoom = requestAnimationFrame(pasoZoom); }
}
document.getElementById("zmas").onclick = function () { zoomBoton(0.55); };
document.getElementById("zmenos").onclick = function () { zoomBoton(1 / 0.55); };

document.getElementById("globo").addEventListener("wheel", function (e) {
  if (!seleccionado || comparando) { return; }
  e.preventDefault();
  e.stopPropagation();
  if (!animandoZoom) { altitudActual = mundo.pointOfView().altitude; altitudMeta = altitudActual; }
  altitudMeta = Math.max(altitudMinima(), Math.min(3, altitudMeta * Math.exp(e.deltaY * 0.0015)));
  if (!animandoZoom) { animandoZoom = true; idZoom = requestAnimationFrame(pasoZoom); }
}, { passive: false, capture: true });

document.querySelectorAll(".item").forEach(function (b) {
  b.onclick = function () { cerrarMenuMovil(); abrirVentana(b.getAttribute("data-v")); };
});

var barra = document.getElementById("barra");
var triangulo = document.getElementById("tri");
var temporizadorMenu = null;

function abrirMenu() {
  clearTimeout(temporizadorMenu);
  barra.classList.add("abierto");
  triangulo.setAttribute("aria-expanded", "true");
}

function cerrarMenuMovil() {
  clearTimeout(temporizadorMenu);
  barra.classList.remove("abierto");
  triangulo.setAttribute("aria-expanded", "false");
}

function cerrarMenuLuego() {
  clearTimeout(temporizadorMenu);
  temporizadorMenu = setTimeout(cerrarMenuMovil, 350);
}

[triangulo, document.getElementById("menu")].forEach(function (el) {
  el.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { abrirMenu(); } });
  el.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") { cerrarMenuLuego(); } });
});
triangulo.addEventListener("click", function () {
  if (barra.classList.contains("abierto")) { cerrarMenuMovil(); } else { abrirMenu(); }
});
triangulo.addEventListener("focus", abrirMenu);
document.getElementById("menu").addEventListener("focusout", function (e) {
  if (!this.contains(e.relatedTarget)) { cerrarMenuLuego(); }
});
document.addEventListener("pointerdown", function (e) {
  if (barra.classList.contains("abierto") && !e.target.closest("#barra")) { cerrarMenuMovil(); }
});
document.getElementById("rotacion").onclick = alternarRotacion;
document.getElementById("fueravista").onclick = function () {
  if (!seleccionado) { return; }
  var v = mundo.pointOfView();
  mundo.controls().autoRotate = false;
  detenerZoom();
  ignorarAvisoHasta = Date.now() + 1200;
  mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: v.altitude }, 1000);
};

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
  else if (a === "objetivo") { seleccionarObjetivo(v); cerrarVentana(); abrirVentana("lugares"); }
  else if (a === "abrir-objetivo") { cerrarVentana(); abrirVentana("objetivo"); }
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

function clicFicha(e) {
  var b = e.target.closest("[data-accion]");
  if (!b) { return; }
  var a = b.getAttribute("data-accion");
  if (a === "cerrar-ficha") { volver(); }
  else if (a === "acercar") { acercar(); }
  else if (a === "similitud") { compararSimilitud(); }
  else if (a === "visor") { abrirVisor(Number(b.getAttribute("data-valor"))); }
  else if (a === "acc") { b.classList.toggle("abierto"); b.nextElementSibling.classList.toggle("abierto"); }
}
document.getElementById("ficha").addEventListener("click", clicFicha);
document.getElementById("ficha2").addEventListener("click", clicFicha);

document.getElementById("cuerpos").addEventListener("click", function (e) {
  var b = e.target.closest("button");
  if (b) { cambiarVista(b.getAttribute("data-c")); }
});
document.getElementById("salircomp").onclick = volver;
document.getElementById("tab1").onclick = function () { document.body.classList.remove("ver-b"); };
document.getElementById("tab2").onclick = function () { document.body.classList.add("ver-b"); };

document.getElementById("galeria").addEventListener("click", function (e) {
  var b = e.target.closest("[data-accion]");
  if (b && b.getAttribute("data-accion") === "vista") {
    var i = Number(b.getAttribute("data-valor"));
    if (window.matchMedia("(max-width: 700px)").matches) { abrirVisor(i); } else { elegirVista(i); }
    return;
  }
  if (e.target.closest(".gprincipal")) { abrirVisor(galeriaIndice); }
});

document.getElementById("visor").addEventListener("click", function (e) {
  var b = e.target.closest("[data-accion]");
  var a = b ? b.getAttribute("data-accion") : "";
  if (a === "visor-ant") { moverVisor(-1); }
  else if (a === "visor-sig") { moverVisor(1); }
  else if (a === "visor-cerrar" || e.target.id === "visor") { cerrarVisor(); }
});

document.addEventListener("keydown", function (e) {
  if (visorAbierto) {
    if (e.key === "Escape") { cerrarVisor(); }
    else if (e.key === "ArrowLeft") { moverVisor(-1); }
    else if (e.key === "ArrowRight") { moverVisor(1); }
    e.preventDefault();
    return;
  }
  if (e.key === "Escape") {
    if (barra.classList.contains("abierto")) { cerrarMenuMovil(); return; }
    if (ventanaActual) { cerrarVentana(); } else if (seleccionado) { volver(); }
    return;
  }
  var n = Number(e.key);
  if (n >= 1 && n <= CONFIG.misiones.length) { cambiarMision(CONFIG.misiones[n - 1].id); return; }
  if ((e.key === "ArrowDown" || e.key === "ArrowUp") && vista === "tierra" && !comparando) {
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


var paneles = ["ventana", "ficha", "ficha2", "galeria"].map(function (id) {
  var panel = document.getElementById(id);
  var boton = document.createElement("button");
  boton.className = "bajar";
  boton.setAttribute("aria-label", T("Deslizar hacia abajo"));
  boton.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M5 8 L12 17 L19 8 Z" fill="currentColor"></path></svg>';
  document.body.appendChild(boton);
  var estado = { panel: panel, boton: boton, bajando: false, ultimo: 0 };

  function paso(t) {
    if (!estado.bajando) { return; }
    var dt = Math.min(50, t - estado.ultimo);
    estado.ultimo = t;
    panel.scrollTop += 0.26 * dt;
    requestAnimationFrame(paso);
  }
  function empezar() {
    if (estado.bajando) { return; }
    estado.bajando = true;
    estado.ultimo = performance.now();
    requestAnimationFrame(paso);
  }
  function parar() { estado.bajando = false; }
  boton.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { empezar(); } });
  boton.addEventListener("pointerleave", parar);
  boton.addEventListener("click", function (e) {
    if (e.pointerType !== "mouse") { panel.scrollBy({ top: panel.clientHeight * 0.7, behavior: "smooth" }); }
  });
  return estado;
});

function actualizarBajar() {
  paneles.forEach(function (e) {
    var p = e.panel;
    var falta = p.scrollHeight - p.clientHeight - p.scrollTop;
    var mostrar = !p.classList.contains("oculta") && falta > 6;
    if (!mostrar) { e.bajando = false; if (e.boton.style.display !== "none") { e.boton.style.display = "none"; } return; }
    var r = p.getBoundingClientRect();
    var s = e.boton.style;
    s.display = "flex";
    s.left = (r.left + 1) + "px";
    s.width = (r.width - 2) + "px";
    s.top = (r.bottom - 55) + "px";
  });
}

function puntoVisible() {
  var c = mundo.getCoords(seleccionado.lat, seleccionado.lon, 0);
  var cam = mundo.camera().position;
  var dentro = (cam.x * c.x + cam.y * c.y + cam.z * c.z) > (c.x * c.x + c.y * c.y + c.z * c.z) * 1.002;
  if (!dentro) { return false; }
  var p = mundo.getScreenCoords(seleccionado.lat, seleccionado.lon, ALT_MARCA);
  return !!p && p.x > -20 && p.x < window.innerWidth + 20 && p.y > -20 && p.y < window.innerHeight + 20;
}


function radioCuerpo() {
  return vista === "marte" ? 3390 : vista === "luna" ? 1737 : radioTierra;
}

function geoRel(lat, lon, este, norte) {
  var r = radioCuerpo(), la = lat * Math.PI / 180, lo = lon * Math.PI / 180;
  var c = [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)];
  var e = [-Math.sin(lo), Math.cos(lo), 0];
  var n = [-Math.sin(la) * Math.cos(lo), -Math.sin(la) * Math.sin(lo), Math.cos(la)];
  var v = [c[0] * r + e[0] * este + n[0] * norte, c[1] * r + e[1] * este + n[1] * norte, c[2] * r + e[2] * este + n[2] * norte];
  var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return { lat: Math.asin(v[2] / m) * 180 / Math.PI, lon: Math.atan2(v[1], v[0]) * 180 / Math.PI };
}

function pantallaRel(s, este, norte) {
  var g = geoRel(s.lat, s.lon, este, norte);
  var p = mundo.getScreenCoords(g.lat, g.lon, ALT_MARCA);
  return p && p.x !== undefined ? p : null;
}

function esquina(c, a, b) {
  function paso(o) {
    var dx = o.x - c.x, dy = o.y - c.y, m = Math.sqrt(dx * dx + dy * dy) || 1;
    return (c.x + dx / m * 16).toFixed(1) + "," + (c.y + dy / m * 16).toFixed(1);
  }
  return '<path class="d-esq" d="M' + paso(a) + ' L' + c.x.toFixed(1) + "," + c.y.toFixed(1) + ' L' + paso(b) + '"></path>';
}

function etiquetaParam(x, y, ancla, nombre, valor, abajo) {
  var y1 = abajo ? y - 16 : y, y2 = abajo ? y : y + 16;
  return '<text class="d-et" x="' + x.toFixed(1) + '" y="' + y1.toFixed(1) + '" text-anchor="' + ancla + '">' + nombre.toUpperCase() + '</text>' +
    '<text class="d-val" x="' + x.toFixed(1) + '" y="' + y2.toFixed(1) + '" text-anchor="' + ancla + '">' + valor + '</text>';
}

var pruebaSobre = "";
var tipClave = "";
var NOMBRE_ES = { rover: "Rover", habitat: "Hábitat", paneles: "Paneles", aterrizaje: "Aterrizaje", perforacion: "Perforación" };
var NOMBRE_ID = { "Rover": "rover", "Hábitat": "habitat", "Paneles": "paneles", "Aterrizaje": "aterrizaje", "Perforación": "perforacion" };
var CLAVES_PRUEBA = { rover: ["pendiente_grados", "rugosidad"], aterrizaje: ["pendiente_grados", "rugosidad"], habitat: ["temp_media_c", "insolacion"], paneles: ["insolacion", "elevacion_m"], perforacion: ["temp_media_c", "rugosidad"] };
var TITULO_PRUEBA = { rover: "Ruta del rover", aterrizaje: "Elipse de aterrizaje", habitat: "Zona de hábitat", paneles: "Campo de paneles", perforacion: "Punto de perforación" };

function puntajeDe(d, m) {
  var ref = referenciaDe(d.referencia), perdida = 0;
  CONFIG.variables.forEach(function (v) {
    var dif = Math.abs(normalizar(v, d[v.campo]) - normalizar(v, ref[v.campo]));
    perdida += m.pesos[v.campo] * Math.min(dif, 1);
  });
  return Math.round(100 * (1 - perdida));
}

function numEs(x) {
  var t = (Math.round(x * 100) / 100).toString();
  return IDIOMA === "es" ? t.replace(".", ",") : t;
}

function tarjetaPrueba(nombre, base) {
  var id = NOMBRE_ID[nombre];
  var m = CONFIG.misiones.filter(function (x) { return x.id === id; })[0];
  var ref = referenciaDe(base.referencia);
  var pun = puntajeDe(base, m);
  var activa = mision.id === id;
  var filas = CLAVES_PRUEBA[id].map(function (campo) {
    var v = CONFIG.variables.filter(function (x) { return x.campo === campo; })[0];
    var cerca = 1 - Math.min(Math.abs(normalizar(v, base[campo]) - normalizar(v, ref[campo])), 1);
    var clase = cerca >= 0.85 ? "a" : cerca >= 0.65 ? "b" : "c";
    var txt = cerca >= 0.85 ? "muy parecido" : cerca >= 0.65 ? "parecido" : "distinto";
    return '<div class="tp-fila"><span class="tp-n">' + v.nombre + '</span><b>' + numEs(base[campo]) + ' ' + v.unidad + '</b><i class="tp-' + clase + '">' + txt + '</i>' +
      '<em>' + T(base.referencia) + ': ' + numEs(ref[campo]) + ' ' + v.unidad + '</em></div>';
  }).join("");
  var todas = CONFIG.misiones.map(function (x) { return { m: x, p: puntajeDe(base, x) }; });
  var mejor = Math.max.apply(null, todas.map(function (x) { return x.p; }));
  var mini = todas.map(function (x) {
    return '<div class="tp-mini' + (x.m.id === id ? " esta" : "") + (x.p === mejor ? " mejor" : "") + '"><span>' + x.m.nombre + '</span><u><s style="width:' + x.p + '%"></s></u><b>' + x.p + '</b></div>';
  }).join("");
  return '<div class="tp-tit">' + T(TITULO_PRUEBA[id]) + '</div><div class="tp-uso">' + m.uso + '</div>' +
    T('<div class="tp-sec">Qué pesa más aquí</div>') + filas +
    T('<div class="tp-sec">Puntaje en ') + m.nombre + '</div><div class="tp-punt"><u><s style="width:' + pun + '%"></s></u><b>' + pun + '</b></div>' +
    T('<div class="tp-sec">Este lugar en las 5 misiones</div>') + mini +
    '<div class="tp-clic">' + (activa ? T("Misión activa") : T("Clic para usar esta misión")) + '</div>' +
    T('<div class="tp-nota">Ubicación ilustrativa. Referencia de ') + T(base.referencia) + T(': valores de prueba.</div>');
}

function ponerTip(x, y) {
  var tip = document.getElementById("tip-prueba");
  var w = tip.offsetWidth, h = tip.offsetHeight;
  var px = x + 18, py = y + 14;
  if (px + w > window.innerWidth - 8) { px = x - w - 18; }
  if (py + h > window.innerHeight - 8) { py = window.innerHeight - h - 8; }
  tip.style.left = Math.max(8, px) + "px";
  tip.style.top = Math.max(8, py) + "px";
}

function mostrarTip(nombre, x, y, forzar) {
  var tip = document.getElementById("tip-prueba");
  var base = seleccionado.esContraparte ? seleccionado.analogo : seleccionado;
  var clave = nombre + "|" + mision.id + "|" + base.id + "|" + vista;
  if (forzar || clave !== tipClave) {
    tip.innerHTML = tarjetaPrueba(nombre, base);
    tipClave = clave;
  }
  tip.classList.remove("oculta");
  ponerTip(x, y);
}

function ocultarTip() {
  document.getElementById("tip-prueba").classList.add("oculta");
  pruebaSobre = "";
  tipClave = "";
}

function pruebaEn(x, y) {
  var el = document.elementFromPoint(x, y);
  var g = el && el.closest ? el.closest("[data-m]") : null;
  return g ? g.getAttribute("data-m") : "";
}

document.addEventListener("pointermove", function (e) {
  if (!seleccionado || comparando || e.buttons) { if (pruebaSobre) { ocultarTip(); } return; }
  var nombre = pruebaEn(e.clientX, e.clientY);
  if (nombre) { pruebaSobre = nombre; mostrarTip(nombre, e.clientX, e.clientY, false); }
  else if (pruebaSobre) { ocultarTip(); }
});

var abajoX = 0, abajoY = 0, abajoPrueba = "";
document.addEventListener("pointerdown", function (e) {
  abajoX = e.clientX;
  abajoY = e.clientY;
  abajoPrueba = seleccionado && !comparando ? pruebaEn(e.clientX, e.clientY) : "";
}, true);
document.addEventListener("pointerup", function (e) {
  if (!abajoPrueba || !seleccionado || comparando) { abajoPrueba = ""; return; }
  var inicio = abajoPrueba;
  abajoPrueba = "";
  if (Math.abs(e.clientX - abajoX) > 6 || Math.abs(e.clientY - abajoY) > 6) { return; }
  if (pruebaEn(e.clientX, e.clientY) !== inicio) { return; }
  cambiarMision(NOMBRE_ID[inicio]);
  pruebaSobre = inicio;
  mostrarTip(inicio, e.clientX, e.clientY, true);
});

function puntosRel(s, lista) {
  var out = [];
  for (var i = 0; i < lista.length; i++) {
    var q = pantallaRel(s, lista[i][0], lista[i][1]);
    if (!q) { return null; }
    out.push(q);
  }
  return out;
}

function trazoRel(s, lista, cerrar) {
  var q = puntosRel(s, lista);
  if (!q) { return ""; }
  return "M" + q.map(function (p) { return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" L") + (cerrar ? " Z" : "");
}

function elipseLista(e0, n0, a, b, giro) {
  var lista = [], g = giro * Math.PI / 180;
  for (var i = 0; i < 48; i++) {
    var t = i / 48 * 2 * Math.PI, x = a * Math.cos(t), y = b * Math.sin(t);
    lista.push([e0 + x * Math.cos(g) - y * Math.sin(g), n0 + x * Math.sin(g) + y * Math.cos(g)]);
  }
  return lista;
}

function textoPrueba(s, e, n, ancla, txt, activa) {
  var q = pantallaRel(s, e, n);
  if (!q) { return ""; }
  return '<text class="d-pt' + (activa ? " act" : "") + '" x="' + q.x.toFixed(1) + '" y="' + q.y.toFixed(1) + '" text-anchor="' + ancla + '">' + txt + '</text>';
}

function zonasPrueba(s, base, ancho, pxkm) {
  if (!base || !base.probar || ancho < 170) { return ""; }
  var lista = base.probar.split(", "), activa = mision && NOMBRE_ES[mision.id], out = "", conTexto = ancho >= 320;
  lista.forEach(function (nombre) {
    var on = nombre === activa, c = "d-prueba" + (on ? " act" : "") + (nombre === pruebaSobre ? " hov" : ""), g = "";
    if (nombre === "Aterrizaje") {
      g += '<path class="' + c + '" d="' + trazoRel(s, elipseLista(-4.6, 3.2, 2.8, 1.5, 25), true) + '"></path>';
      var k = pantallaRel(s, -4.6, 3.2);
      if (k) { g += '<path class="d-cruz' + (on ? " act" : "") + '" d="M' + (k.x - 5) + "," + k.y + " L" + (k.x + 5) + "," + k.y + " M" + k.x + "," + (k.y - 5) + " L" + k.x + "," + (k.y + 5) + '"></path>'; }
      if (conTexto) { g += textoPrueba(s, -4.6, 0.9, "middle", T("ELIPSE DE ATERRIZAJE"), on); }
    }
    if (nombre === "Rover") {
      var ruta = [[1.2, 1.2], [2.4, 2.8], [3.8, 2.3], [5.0, 4.0], [6.4, 3.6]];
      g += '<path class="d-hitruta" d="' + trazoRel(s, ruta, false) + '"></path>';
      g += '<path class="' + c + ' ruta" d="' + trazoRel(s, ruta, false) + '"></path>';
      var a0 = pantallaRel(s, 1.2, 1.2), a1 = pantallaRel(s, 6.4, 3.6);
      if (a0) { g += '<circle class="d-punto' + (on ? " act" : "") + '" cx="' + a0.x.toFixed(1) + '" cy="' + a0.y.toFixed(1) + '" r="3"></circle>'; }
      if (a1) { g += '<g class="d-icono' + (on ? " act" : "") + '" transform="translate(' + a1.x.toFixed(1) + "," + a1.y.toFixed(1) + ')"><rect x="-8" y="-6" width="16" height="7" rx="1.5"></rect><circle cx="-5" cy="4" r="2.6"></circle><circle cx="5" cy="4" r="2.6"></circle><path d="M2,-6 L5,-11 L9,-11"></path></g>'; }
      if (conTexto) { g += textoPrueba(s, 3.6, 5.2, "middle", T("RUTA DEL ROVER"), on); }
    }
    if (nombre === "Hábitat") {
      var h = pantallaRel(s, -3.2, -2.6), rh = 1 * pxkm;
      if (h) {
        g += '<circle class="' + c + '" cx="' + h.x.toFixed(1) + '" cy="' + h.y.toFixed(1) + '" r="' + rh.toFixed(1) + '"></circle>';
        g += '<path class="d-icono' + (on ? " act" : "") + '" d="M' + (h.x - 7) + "," + (h.y + 4) + " A7,7 0 0 1 " + (h.x + 7) + "," + (h.y + 4) + " Z M" + (h.x - 11) + "," + (h.y + 4) + " L" + (h.x + 11) + "," + (h.y + 4) + '"></path>';
      }
      if (conTexto) { g += textoPrueba(s, -3.2, -4.3, "middle", T("ZONA DE HÁBITAT"), on); }
    }
    if (nombre === "Paneles") {
      var caja = [[2.6, -2.8], [5.8, -2.8], [5.8, -4.4], [2.6, -4.4]];
      g += '<path class="' + c + '" d="' + trazoRel(s, caja, true) + '"></path>';
      var rej = "";
      [3.67, 4.73].forEach(function (e) { rej += trazoRel(s, [[e, -2.8], [e, -4.4]], false); });
      rej += trazoRel(s, [[2.6, -3.6], [5.8, -3.6]], false);
      g += '<path class="d-rejilla' + (on ? " act" : "") + '" d="' + rej + '"></path>';
      if (conTexto) { g += textoPrueba(s, 4.2, -2.2, "middle", T("CAMPO DE PANELES"), on); }
    }
    if (nombre === "Perforación") {
      var pf = pantallaRel(s, 0.8, -5.2);
      if (pf) {
        g += '<circle class="' + c + '" cx="' + pf.x.toFixed(1) + '" cy="' + pf.y.toFixed(1) + '" r="' + (0.5 * pxkm).toFixed(1) + '"></circle>';
        g += '<circle class="' + c + '" cx="' + pf.x.toFixed(1) + '" cy="' + pf.y.toFixed(1) + '" r="' + (0.22 * pxkm).toFixed(1) + '"></circle>';
        g += '<path class="d-cruz' + (on ? " act" : "") + '" d="M' + (pf.x - 7) + "," + pf.y + " L" + (pf.x + 7) + "," + pf.y + " M" + pf.x + "," + (pf.y - 7) + " L" + pf.x + "," + (pf.y + 7) + '"></path>';
      }
      if (conTexto) { g += textoPrueba(s, 1.6, -5.35, "start", T("PUNTO DE PERFORACIÓN"), on); }
    }
    out += '<g class="d-hit" data-m="' + nombre + '">' + g + '</g>';
  });
  return out;
}

function dibujarDetalle() {
  var svg = document.getElementById("detalle");
  if (!seleccionado || comparando || !puntoVisible()) { if (svg.innerHTML) { svg.innerHTML = ""; } return; }
  var s = seleccionado;
  var nw = pantallaRel(s, -10, 10), ne = pantallaRel(s, 10, 10), se = pantallaRel(s, 10, -10), sw = pantallaRel(s, -10, -10);
  var cen = pantallaRel(s, 0, 0), nor = pantallaRel(s, 0, 1);
  if (!nw || !ne || !se || !sw || !cen || !nor) { svg.innerHTML = ""; return; }
  var ancho = Math.sqrt(Math.pow(ne.x - nw.x, 2) + Math.pow(ne.y - nw.y, 2));
  var op = Math.max(0, Math.min(1, (ancho - 110) / 90));
  if (op <= 0) { if (svg.innerHTML) { svg.innerHTML = ""; } return; }
  var pxkm = ancho / 20;
  var partes = "";
  var anillos = [1, 5, 10];
  anillos.forEach(function (km) {
    var r = km * pxkm;
    if (r < 22) { return; }
    var d = "";
    for (var i = 0; i < 72; i++) {
      var a = i / 72 * 2 * Math.PI;
      var q = pantallaRel(s, km * Math.cos(a), km * Math.sin(a));
      if (!q) { return; }
      d += (i ? "L" : "M") + q.x.toFixed(1) + "," + q.y.toFixed(1);
    }
    partes += '<path class="d-anillo" d="' + d + 'Z"></path>';
    var e = pantallaRel(s, km, 0);
    if (e) { partes += '<text class="d-anillo-t" x="' + (e.x + 6).toFixed(1) + '" y="' + (e.y - 5).toFixed(1) + '">' + km + ' km</text>'; }
  });
  partes += '<polygon class="d-caja" points="' + [nw, ne, se, sw].map(function (p) { return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ") + '"></polygon>';
  partes += esquina(nw, ne, sw) + esquina(ne, nw, se) + esquina(se, ne, sw) + esquina(sw, nw, se);
  var enCuerpo = !!s.esContraparte;
  var base = enCuerpo ? s.analogo : s;
  partes += zonasPrueba(s, base, ancho, pxkm);
  var tipo = mision && base.probar && base.probar.split(", ").indexOf(NOMBRE_ES[mision.id]) >= 0 ? T("PRUEBA ACTIVA · ") + mision.nombre.toUpperCase() : T("SE PUEDE PROBAR: ") + (base.probar || "").split(", ").map(function (n) { return T(n).toUpperCase(); }).join(" · ");
  partes += '<text class="d-sub der" x="' + ne.x.toFixed(1) + '" y="' + (ne.y - 10).toFixed(1) + '" text-anchor="end">' + tipo + '</text>';
  partes += '<text class="d-sub" x="' + sw.x.toFixed(1) + '" y="' + (sw.y + 16).toFixed(1) + T('">UBICACIÓN ILUSTRATIVA DE LAS PRUEBAS</text>');
  partes += '<text class="d-tit" x="' + nw.x.toFixed(1) + '" y="' + (nw.y - 10).toFixed(1) + T('">ZONA ANALIZADA · 20 × 20 km</text>');
  if (enCuerpo) { partes += '<text class="d-sub" x="' + nw.x.toFixed(1) + '" y="' + (nw.y - 24).toFixed(1) + T('">REFERENCIA DE ') + T(s.referencia).toUpperCase() + T(' · VALORES DE PRUEBA</text>'); }
  if (ancho >= 250 && base.partes) {
    var vals = base.partes.map(function (p) { return { n: p.v.nombre, t: (enCuerpo ? p.ref : p.valor) + " " + p.v.unidad }; });
    partes += etiquetaParam(nw.x + 14, nw.y + 24, "start", vals[0].n, vals[0].t, false);
    partes += etiquetaParam(ne.x - 14, ne.y + 24, "end", vals[1].n, vals[1].t, false);
    partes += etiquetaParam(sw.x + 14, sw.y - 14, "start", vals[2].n, vals[2].t, true);
    partes += etiquetaParam(se.x - 14, se.y - 14, "end", vals[3].n, vals[3].t, true);
    if (ancho >= 330) { partes += etiquetaParam((sw.x + se.x) / 2, (sw.y + se.y) / 2 - 14, "middle", vals[4].n, vals[4].t, true); }
  }
  var cont = document.getElementById("globo");
  var gw = cont.clientWidth, gh = cont.clientHeight;
  var opciones = [0.5, 1, 2, 5, 10, 20, 50, 100, 200], km = opciones[0];
  opciones.forEach(function (o) { if (o * pxkm <= 150) { km = o; } });
  var largo = km * pxkm, x2 = gw - 28, x1 = x2 - largo, yb = gh - 44;
  partes += '<path class="d-escala" d="M' + x1.toFixed(1) + "," + (yb - 6) + " L" + x1.toFixed(1) + "," + yb + " L" + x2.toFixed(1) + "," + yb + " L" + x2.toFixed(1) + "," + (yb - 6) + '"></path>';
  partes += '<text class="d-anillo-t" x="' + ((x1 + x2) / 2).toFixed(1) + '" y="' + (yb - 11) + '" text-anchor="middle">' + km + ' km</text>';
  var ang = Math.atan2(nor.x - cen.x, -(nor.y - cen.y)) * 180 / Math.PI;
  partes += '<g transform="translate(' + (x1 - 30).toFixed(1) + ',' + (yb - 8) + ') rotate(' + ang.toFixed(1) + ')"><path class="d-norte" d="M0,-15 L6,7 L0,3 L-6,7 Z"></path></g>';
  partes += '<text class="d-anillo-t" x="' + (x1 - 30).toFixed(1) + '" y="' + (yb + 14) + '" text-anchor="middle">N</text>';
  svg.innerHTML = '<g opacity="' + op.toFixed(2) + '">' + partes + '</g>';
}

function mantenerCentro() {
  if (!fijarSitio || !seleccionado || comparando || Date.now() < ignorarAvisoHasta) { return; }
  var v = mundo.pointOfView();
  if (Math.abs(v.lat - seleccionado.lat) > 0.00002 || Math.abs(v.lng - seleccionado.lon) > 0.00002) {
    mundo.pointOfView({ lat: seleccionado.lat, lng: seleccionado.lon, altitude: v.altitude }, 0);
  }
}

function seguir() {
  actualizarBajar();
  mantenerCentro();
  dibujarDetalle();
  var trazo = document.getElementById("trazo");
  var ancla = document.getElementById("ancla");
  var ficha = document.getElementById("ficha");
  var aviso = document.getElementById("fueravista");
  var visible = !seleccionado || comparando || Date.now() < ignorarAvisoHasta || puntoVisible();
  aviso.classList.toggle("oculta", visible);
  if (seleccionado && visible && !comparando && !ficha.classList.contains("oculta")) {
    var p = mundo.getScreenCoords(seleccionado.lat, seleccionado.lon, ALT_MARCA);
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
  var km = Math.round(mundo.pointOfView().altitude * (vista === "marte" ? 3390 : vista === "luna" ? 1737 : radioTierra));
  var texto = T("ALTITUD ") + km.toLocaleString("es-EC") + " KM" + creditoActivo;
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

function refrescarTodoIdioma() {
  etiquetaObjetivo();
  iconoRotacion();
  actualizarAviso();
  marcarCuerpos();
  filtrar();
  pintarMarcas();
  pintarFicha();
  if (ventanaActual) { pintarVentana(); }
  pintarGaleria();
  if (comparando) { actualizarComparacion(); }
  if (typeof traducirEstaticos === "function") { traducirEstaticos(); }
}

function iniciar() {
  datosIdioma();
  armarContrapartes();
  recalcular();
  filtrar();
  etiquetaMision();
  etiquetaObjetivo();
  iconoRotacion();
  marcarCuerpos();
  actualizarAviso();
  pintarMarcas();
  seguir();
  traducirEstaticos();
}

fetch("datos/lugares.csv")
  .then(function (r) { if (!r.ok) { throw new Error("sin csv"); } return r.text(); })
  .then(function (t) { var datos = leerCsv(t); if (datos.length) { todos = datos; } iniciar(); })
  .catch(function () { iniciar(); });

document.getElementById("globo").addEventListener("pointerdown", function () { detenerZoom(); fijarSitio = false; });
