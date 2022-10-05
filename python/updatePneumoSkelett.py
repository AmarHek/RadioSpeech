from pymongo import MongoClient

# mongoDB setup
client = MongoClient()
db = client.radio
materials = db.material

# prepare replacement variables
variableSkelett = {
    "id": "S8",
    "textBefore": "",
    "textAfter": "",
    "keys": [
        ["frisch"],
        ["alt"]
    ],
    "kind": "oc",
    "value": None,
    "values": ["frisch", "alt"]
}

variablePneumonie0 = {
    "id": "Pn2",
    "textBefore": "",
    "textAfter": "",
    "keys": [
        ["OL", "Oberfeld", "Oberlappen"],
        ["UL", "Unterfeld", "Unterlappen"],
        ["ML", "Mittelfeld", "Mittellappen"]
    ],
    "kind": "mc",
    "values": [
        ["OL", False],
        ["UL", False],
        ["ML", False]
    ]
}

variablePneumonieOL = {
    "id": "Pn2",
    "textBefore": "",
    "textAfter": "",
    "keys": [
        ["OL", "Oberfeld", "Oberlappen"],
        ["UL", "Unterfeld", "Unterlappen"],
        ["ML", "Mittelfeld", "Mittellappen"]
    ],
    "kind": "mc",
    "values": [
        ["OL", True],
        ["UL", False],
        ["ML", False]
    ]
}

variablePneumonieUL = {
    "id": "Pn2",
    "textBefore": "",
    "textAfter": "",
    "keys": [
        ["OL", "Oberfeld", "Oberlappen"],
        ["UL", "Unterfeld", "Unterlappen"],
        ["ML", "Mittelfeld", "Mittellappen"]
    ],
    "kind": "mc",
    "values": [
        ["OL", False],
        ["UL", True],
        ["ML", False]
    ]
}

variablePneumonieML = {
    "id": "Pn2",
    "textBefore": "",
    "textAfter": "",
    "keys": [
        ["OL", "Oberfeld", "Oberlappen"],
        ["UL", "Unterfeld", "Unterlappen"],
        ["ML", "Mittelfeld", "Mittellappen"]
    ],
    "kind": "mc",
    "values": [
        ["OL", False],
        ["UL", False],
        ["ML", True]
    ]
}

# get all IDs of judged materials
oids = []
for material in materials.find({"judged": True}):
    oid = material.get("_id")
    oids.append(oid)

# perform updates by iterating through ids
for oid in oids:
    material = materials.find_one({"_id": oid})

    # get variables of selectable 'Fraktur' in category 'Skelett'
    skellyVariables = material.get("deepDocTemplate").get("parts")[23].get("selectables")[11].get("variables")
    # if amount of variables is 2 or less, then no variable has been added yet (as of old template).
    # Only then to be added to variables
    if len(skellyVariables) < 3:
        skellyVariables.append(variableSkelett)

    # get variables of value 'Pneumonie' in first group of category 'Lunge'
    pneumoVariables = material.get("deepDocTemplate").get("parts")[16].get("selectables")[0].get("options")[1].get("variables")

    # only change the variable if the underlying variable is still oc, otherwise no changes required
    if pneumoVariables[2].get("kind") == "oc":
        # check value of variables with index 2 ('OL'/'UL'/ML') and replace said variable based on value
        if pneumoVariables[2].get("value") == 'UL':
            pneumoVariables[2] = variablePneumonieUL
        elif pneumoVariables[2].get("value") == 'ML':
            pneumoVariables[2] = variablePneumonieML
        elif pneumoVariables[2].get("value") == 'OL':
            pneumoVariables[2] = variablePneumonieOL
        else:
            pneumoVariables[2] = variablePneumonie0

    # finally, update by replacing
    materials.replace_one({"_id": oid}, material)

print("success!")
