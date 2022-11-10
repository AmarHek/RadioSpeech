from pymongo import MongoClient

# mongoDB setup
client = MongoClient()
db = client.radio
materials = db.material

newHTQ = {
    "id": "H1",
    "textBefore": "beträgt ",
    "textAfter": "",
    "keys": [],
    "kind": "number",
    "value": 0
}

oids = []
for material in materials.find({"judged": True}):
    oid = material.get("_id")
    oids.append(oid)

for oid in oids:
    material = materials.find_one({"_id": oid})

    # get selectable "Herz-Thorax-Quotient" from parts
    htq = material["deepDocTemplate"]["parts"][11]["selectables"][1]
    htq_var = htq["variables"][0]
    if (htq_var["numerator"] > 0) & (htq_var["denominator"] > 0):
        newHTQ["value"] = htq_var["numerator"] / htq_var["denominator"]

    htq["variables"][0] = newHTQ

    materials.replace_one({"_id": oid}, material)