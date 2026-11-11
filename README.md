# ORBIS

**Simulador 3D de selección de sitios análogos para la Luna y Marte.**

Globo 3D interactivo para el reto **"Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars"** del NASA Space Apps Challenge 2026 (Guayaquil).

Muestra lugares de la Tierra que se parecen a Marte o a la Luna. Cada lugar tiene un puntaje de similitud de 0 a 100, y un selector de misión (General, Rover, Hábitat, Paneles, Aterrizaje) cambia el ranking según lo que se quiere probar.

> Los datos actuales son **de prueba**. No son resultados científicos. Se reemplazan con datos reales en `datos/lugares.csv`.

## Cómo usarlo

1. Gira el planeta con el mouse y toca un punto, o elige un lugar en el ranking.
2. Cambia la misión en los botones de abajo (o con las teclas 1 a 5). El ranking se recalcula al instante.
3. En la ficha del lugar, pulsa "Ver el sitio de cerca" para acercarte. Con la rueda del mouse acercas o alejas centrado en el sitio.
4. Teclas: ↑ ↓ cambian de lugar, Esc vuelve al planeta.

## Cómo se calcula el puntaje

```
puntaje = 100 × (1 − Σ peso × diferencia)
```

Cada variable se lleva a una escala de 0 a 1 con los rangos de `CONFIG.variables` (en `app.js`). La diferencia es entre el valor del lugar y el de la referencia de Marte o la Luna (`CONFIG.referencias`). Los pesos de cada misión están en `CONFIG.misiones` y suman 1.

El puntaje mide **parecido según las variables elegidas**. No es una probabilidad ni una prueba científica. Cada ficha indica en qué se parece, en qué no y qué tan confiable es el dato.

## Cómo editar los datos

Abre `datos/lugares.csv` en GitHub (botón del lápiz), cambia o agrega filas y guarda. La página se actualiza sola en uno o dos minutos. No hace falta instalar nada.

| Columna | Qué es |
|---|---|
| id | Número único del lugar |
| nombre, pais | Nombre y país |
| categoria | `Famoso`, `Poco conocido` o `Ecuador` |
| lat, lon | Coordenadas en grados decimales |
| referencia | `Marte` o `Luna` |
| elevacion_m | Elevación en metros |
| pendiente_grados | Pendiente media en grados |
| rugosidad | Índice de 0 a 100 |
| temp_media_c | Temperatura media en °C |
| insolacion | Luz solar en kWh/m² por día |
| se_parece_en, no_se_parece_en, como_ayuda | Textos de la ficha |
| probar | Misiones donde sirve, separadas por coma (Rover, Hábitat, Paneles, Aterrizaje) |
| confianza | `Alta`, `Media` o `Baja` |

Los textos con comas van entre comillas, por ejemplo `"Hábitat, Rover"`.

`datos/lugares.js` es un respaldo para abrir la página sin servidor. Se regenera con `python herramientas/actualizar_respaldo.py` (requiere pandas).

## Estructura

```
index.html          página principal
app.js              lógica, configuración y selector de misión
estilos.css         diseño
datos/              lugares.csv (datos) y lugares.js (respaldo)
lib/                globe.gl y texturas de la Tierra
herramientas/       script de respaldo de datos
```

## Cómo verlo en tu computadora

Abre la carpeta en VS Code y usa la extensión **Live Server** (clic derecho en `index.html`, "Open with Live Server"). Abrir `index.html` con doble clic muestra el globo, pero el navegador bloquea la lectura del CSV y las texturas.

## Publicación

GitHub Pages: Settings, Pages, "Deploy from a branch", rama `main`, carpeta `/ (root)`.

## Créditos

- Globo 3D: [globe.gl](https://globe.gl) (MIT) sobre Three.js.
- Texturas de la Tierra: NASA Blue Marble, incluidas en el paquete three-globe.
- Imágenes satelitales al hacer zoom: Esri, Maxar, Earthstar Geographics (se cargan desde internet; configurable en `CONFIG.mosaico`).
- Datos de los lugares: de prueba, pendientes de reemplazar por fuentes reales (NASA, USGS, Copernicus). Anotar aquí cada fuente cuando se agregue.

## Equipo

Pendiente de completar.
