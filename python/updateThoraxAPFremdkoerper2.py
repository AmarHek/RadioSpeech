from pymongo import MongoClient

# mongoDB setup
client = MongoClient()
db = client.radio
materials = db.material

# prepare replacement variable
fremdkoerper2 = {
    "kind": "box",
    "name": "Andere Fremdkörper 2",
    "value": False,
    "normal": False,
    "exclusions": ["Keine"],
    "variables": [
        {
            "id": "I42",
            "textBefore": "",
            "textAfter": "",
            "keys": [
                ["medizinisch", "Kabel"],
                ["nicht medizinisch", "Metallsplitter"]
            ],
            "kind": "oc",
            "value": None,
            "values": ["medizinisch (Kabel etc.)", "nicht medizinisch (Metallsplitter etc.)"]
        },
        {
            "id": "I43",
            "textBefore": "",
            "textAfter": "",
            "keys": [
                ["extrakorporal"],
                ["intrakorporal"]
            ],
            "kind": "oc",
            "value": None,
            "values": ["extrakorporal", "intrakorporal"]
        }
    ],
    "keys": ["Andere Fremdkörper 2", "Anderer Fremdkörper 2", "Andere Fremdkörper Zwei"],
    "text": "Weitere Fremdkörper [%I42%][, %I43%]"
}

# get all IDs of judged materials
oids = []
for material in materials.find({"judged": True}):
    oid = material.get("_id")
    oids.append(oid)

for oid in oids:
    material = materials.find_one({"_id": oid})

    # get selectable "Thorax im Liegen" from parts
    thoraxLiegen = material.get("deepDocTemplate").get("parts")[0].get("selectables")[0].get("options")[2]
    if thoraxLiegen["name"] == "Thorax im Liegen":
        thoraxLiegen["name"] = "Thorax a.p."
        thoraxLiegen["keys"] = ["Thorax a.p., Thorax ap"]

    # get Instrumentierung
    instrumentierungSel = material["deepDocTemplate"]["parts"][2]["selectables"]
    if len(instrumentierungSel) <= 23:
        instrumentierungSel.append(fremdkoerper2)

    materials.replace_one({"_id": oid}, material)

