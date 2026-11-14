import json
import pandas as pd

tabla = pd.read_csv("datos/lugares.csv")
texto = "var LUGARES = " + json.dumps(tabla.to_dict(orient="records"), ensure_ascii=False, indent=1) + ";\n"
open("datos/lugares.js", "w", encoding="utf-8").write(texto)
print("listo: datos/lugares.js con", len(tabla), "lugares")
