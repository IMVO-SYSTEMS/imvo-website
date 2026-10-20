#!/usr/bin/env python3
"""Build verified Africa city labels from public-domain Natural Earth populated places."""
import json, re, sys
from collections import defaultdict
from pathlib import Path

source=Path(sys.argv[1]); target=Path("app/studio-canvas/africaCityPoints.ts")
countries=Path("app/studio-canvas/africaCountryOutlines.ts").read_text()
iso=set(re.findall(r'"iso":"([A-Z]{3})"',countries))
features=json.loads(source.read_text())["features"]
grouped=defaultdict(list)
for feature in features:
    p=feature["properties"]; geo=feature.get("geometry") or {}
    if geo.get("type")!="Point": continue
    code=p.get("ADM0_A3") or p.get("SOV_A3")
    name=p.get("NAMEASCII") or p.get("NAME")
    if not name or code not in iso: continue
    lon,lat=geo["coordinates"][:2]
    if not (-19<=lon<=56 and -35<=lat<=39): continue
    pop=max(int(p.get("POP_MAX") or 0),int(p.get("POP_OTHER") or 0))
    grouped[code].append({"iso":code,"name":str(name),"lon":round(lon,5),"lat":round(lat,5),"population":pop,
      "capital":bool(p.get("ADM0CAP"))})

rows=[]
for code in sorted(iso):
    options=sorted(grouped[code],key=lambda x:(not x["capital"],-x["population"]))
    seen=set()
    for o in options:
        key=o["name"].lower()
        if key in seen:continue
        seen.add(key)
        rows.append({k:v for k,v in o.items() if k!="population"})
        if len(seen)>=14:break
target.write_text('''/** Geographically sourced African cities, Natural Earth public-domain
 * ne_10m_populated_places.geojson; curated local landmarks take precedence.
 */\nexport const additionalAfricaCities:{iso:string;name:string;lon:number;lat:number;capital?:boolean}[] = '''+
    json.dumps(rows,ensure_ascii=False,separators=(",",":"))+';\n')
print(f"Imported {len(rows)} city labels across {len(grouped)} African national or territorial regions.")
print("Country city counts:",{c:len([a for a in rows if a["iso"]==c]) for c in sorted(iso)})
