import * as XLSX from 'ts-xlsx';
import {
    Block,
    Category,
    CheckBox,
    Enumeration,
    Group,
    Option,
    Selectable,
    TopLevel,
    Variable,
    VariableCommon,
    VariableDate,
    VariableMC,
    VariableNumber,
    VariableOC,
    VariableRatio,
    VariableText
} from "../models/template.model";

interface Row {
    Typ: string;
    Gliederung: string;
    Optional: string;
    "Baustein Befund": string;
    "data-bau": string;
    Normal: string;
    Default: string;
    "Choice-Gruppe": string;
    "Aufzählung": string;
    "Variable-ID": string;
    "Variable-Typ": string;
    "data-syn": string;
    "NK-Stellen": string;
    "Variable-Info": string;
    "Text Befund": string;
    "Aufzählungstexte": string;
    "Text Beurteilung": string;
}

export function parseXLSToJson(binary_string: string): string {
    //get workbook from binary string
    const wb: XLSX.IWorkBook = XLSX.read(binary_string, {type: "binary"});

    //select first sheet
    const worksheet_name: string = wb.SheetNames[0];
    const ws: XLSX.IWorkSheet = wb.Sheets[worksheet_name];

    //get rows as json objects
    const rows = XLSX.utils.sheet_to_json(ws) as Row[];

    const parts = new Array<TopLevel>();

    let i = 0;
    while (i < rows.length) {
        const row = rows[i];
        if (row["Typ"] == "Block") {
            parts.push(extractBlock(row));
            i++;
        } else if (row["Typ"] == "Aufzählung") {
            parts.push(extractEnumeration(row));
            i++;
        } else if (row["Gliederung"] != undefined) {
            const relevantRows = new Array<Row>();
            relevantRows.push(row);
            let j = i + 1;
            for (; j < rows.length; j++) {
                const subRow = rows[j];
                //Add rows below start of "Gliederung" until new Gliederung or Block / Enumeration starts
                if (subRow["Gliederung"] != undefined || subRow["Typ"] != undefined) {
                    break;
                }
                relevantRows.push(subRow)
            }
            i = j;
            parts.push(extractCategory(relevantRows));
        }
    }
    let final: string = JSON.stringify(parts)
    //remove double escaping of newline characters
    final = final.split("\\\\").join("\\")
    return final
}

export function extractBlock(row: Row): Block {
    const judgementText = row["Text Beurteilung"] == undefined ? null as any : row["Text Beurteilung"]
    let text = row["Text Befund"]
    return {
        kind: "block",
        text: text,
        judgementText: judgementText
    };
}

export function extractEnumeration(row: Row): Enumeration {
    let judgementText = row["Text Beurteilung"] == undefined ? null as any : row["Text Beurteilung"];
    return {
        kind: "enumeration",
        text: row["Text Befund"],
        judgementText: judgementText,
        id: row["Aufzählung"]
    }
}

export function extractCategory(rows: Row[]): Category {
    const selectables = new Array<Selectable>()
    let i = 0;
    while (i < rows.length) {
        const row = rows[i];
        if (row["Choice-Gruppe"] != undefined) {
            //Find relevant rows for group that starts here, and extract group
            let relevantRows = new Array<Row>();
            let j = i + 1;
            let currentChoiceGroup = row["Choice-Gruppe"];
            relevantRows.push(row)
            for (; j < rows.length; j++) {
                let subRow = rows[j]
                if (subRow["Choice-Gruppe"] != undefined && subRow["Choice-Gruppe"] != currentChoiceGroup) break;//new choice group
                if (subRow["Typ"] != undefined || subRow["Gliederung"] != undefined) break; // new TopLevel
                if (subRow["Choice-Gruppe"] == undefined && subRow["Baustein Befund"] != undefined) break; //checkbox
                relevantRows.push(subRow);
            }
            i = j;
            const group = extractGroup(relevantRows);
            selectables.push(group)
        } else {
            //Find relevant rows for checkbox that starts here, and extract checkbox
            let relevantRows = new Array<Row>();
            let j = i + 1;
            relevantRows.push(row)
            for (; j < rows.length; j++) {
                const subRow = rows[j];
                if (subRow["Baustein Befund"] != undefined || subRow["Typ"] != undefined || subRow["Gliederung"] != undefined) break;
                relevantRows.push(subRow)
            }
            i = j;
            const box = extractBox(relevantRows);
            selectables.push(box)
        }
    }
    let optional = rows[0]["Optional"] != undefined

    return {
        kind: "category",
        name: rows[0]["Gliederung"],
        optional: optional,
        selectables: selectables
    };
}

export function extractGroup(rows: Row[]): Group {
    const options = new Array<Option>();
    let i = 0;
    while (i < rows.length) {
        const row = rows[i]
        const relevantRows = new Array<Row>();
        relevantRows.push(row)

        let j = i + 1
        for (; j < rows.length; j++) {
            const subRow = rows[j]
            if (subRow["Choice-Gruppe"] != undefined) break;
            relevantRows.push(subRow)
        }
        i = j;
        const option = extractOption(relevantRows)
        options.push(option)
    }
    return {
        kind: "group",
        name: rows[0]["Choice-Gruppe"],
        options: options,
        value: null as any
    };
}

export function extractOption(rows: Row[]): Option {
    const variables = extractSelectableVariables(rows)
    const keys = extractSelectableKeys(rows)
    let text = rows[0]["Text Befund"]
    const judgementText = rows[0]["Text Beurteilung"] == undefined ? null as any : rows[0]["Text Beurteilung"]
    return {
        keys: keys,
        kind: "option",
        name: rows[0]["Baustein Befund"],
        normal: rows[0]["Normal"] != undefined,
        text: text,
        variables: variables,
        judgementText: judgementText
    }
}

function extractSelectableVariables(rows: Row[]): Variable[] {
    const variables = new Array<Variable>();
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (row["Variable-Typ"] != undefined) {
            variables.push(extractVariable(row))
        }
    }
    return variables
}


function extractSelectableKeys(rows: Row[]): string[] {
    return trimArray(rows[0]["data-bau"].split(";"))
}

function extractBox(rows: Row[]): CheckBox {
    const variables = extractSelectableVariables(rows)
    const keys = extractSelectableKeys(rows)

    let judgementText = rows[0]["Text Beurteilung"] == undefined ? null as any : rows[0]["Text Beurteilung"]
    let enumeration = rows[0]["Aufzählung"] == undefined ? null as any : rows[0]["Aufzählung"]

    let text = null as any
    if (rows[0]["Text Befund"] != undefined) {
        text = rows[0]["Text Befund"]
    } else if (rows[0]["Aufzählungstexte"] != undefined) {
        text = rows[0]["Aufzählungstexte"]
    }

    return {
        kind: "box",
        name: rows[0]["Baustein Befund"],
        value: rows[0]["Default"] != undefined,
        text: text,
        normal: rows[0]["Normal"] != undefined,
        variables: variables,
        keys: keys,
        judgementText: judgementText,
        enumeration: enumeration
    };
}

function extractVariable(row: Row): Variable {
    const variable: VariableCommon = {
        id: row["Variable-ID"],
        textBefore: extractTextBefore(row["Variable-Info"]),
        textAfter: extractTextAfter(row["Variable-Info"]),
        keys: extractVariableKeys(row)
    }

    if (row["Variable-Typ"] == "Zahl") {
        return extractVariableNumber(row, variable)
    } else if (row["Variable-Typ"] == "Text") {
        return extractVariableText(row, variable)
    } else if (row["Variable-Typ"] == "ZahlBruch") {
        return extractVariableRatio(row, variable)
    } else if (row["Variable-Typ"].includes("/")) {
        return extractVariableOC(row, variable)
    } else if (row["Variable-Typ"].includes(";")) {
        return extractVariableMC(row, variable)
    } else {
        return extractVariableDate(row, variable)
    }
}

function extractVariableOC(row: Row, variable: VariableCommon): VariableOC {
    const parsed = variable as VariableOC
    parsed.kind = "oc"
    parsed.value = null as any
    parsed.values = trimArray(row["Variable-Typ"].split("/"))
    return parsed
}

function extractVariableMC(row: Row, variable: VariableCommon): VariableMC {
    const parsed = variable as VariableMC
    const textValues = trimArray(row["Variable-Typ"].split(";"))
    const values = new Array<[string, boolean]>()
    textValues.forEach(textValue => values.push([textValue, false]))
    parsed.kind = "mc"
    parsed.values = values
    return parsed
}

function extractVariableText(row: Row, variable: VariableCommon): VariableText {
    const parsed = variable as VariableText
    parsed.kind = "text"
    parsed.value = ""
    return parsed
}

function extractVariableNumber(row: Row, variable: VariableCommon): VariableNumber {
    const parsed = variable as VariableNumber
    parsed.kind = "number"
    parsed.value = 0
    return parsed
}

function extractVariableRatio(row: Row, variable: VariableCommon): VariableRatio {
    const parsed = variable as VariableRatio
    parsed.kind = "ratio"
    parsed.fractionDigits = Number(row["NK-Stellen"])
    parsed.numerator = 0
    parsed.denominator = 0
    return parsed
}

function extractVariableDate(row: Row, variable: VariableCommon): VariableDate {
    const parsed = variable as VariableDate;
    parsed.value = {
        year: 2019,
        month: 1,
        day: 1
    }
    parsed.kind = "date"
    return parsed
}

function extractVariableKeys(row: Row): string[][] {
    const keys = new Array<string[]>();
    const keysString = row["data-syn"]
    if (keysString == undefined) return null as any
    if (keysString.includes("/")) {
        const values = keysString.split("/")
        for (let i = 0; i < values.length; i++) {
            keys.push(new Array<string>())
            const synonyms = values[i].split(";")
            for (let j = 0; j < synonyms.length; j++) {
                keys[i].push(synonyms[j])
            }
        }
        return trim2DArray(keys)
    } else {
        const values = keysString.split(";")
        for (let i = 0; i < values.length; i++) {
            keys.push(new Array<string>())
            const synonyms = values[i].split(",")
            for (let j = 0; j < synonyms.length; j++) {
                keys[i].push(synonyms[j])
            }
        }
        return trim2DArray(keys)
    }
}

function extractTextBefore(varInfo: string): string {
    if (varInfo == undefined) return ""
    return varInfo.split("...")[0]
}

function extractTextAfter(varInfo: string): string {
    if (varInfo == undefined || varInfo.split("...").length < 2) return ""
    return varInfo.split("...")[1]
}

function trimArray(array: string[]): string[] {
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trim()
    }
    return array
}

function trim2DArray(array: string[][]): string[][] {
    for (let i = 0; i < array.length; i++) {
        const sublist = array[i]
        for (let j = 0; j < sublist.length; j++) {
            sublist[j] = sublist[j].trim()
        }
    }
    return array
}




