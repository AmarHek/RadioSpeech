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
    VariableText
} from "../models/template.model";
import {trim2DArray, trimArray, isNumber} from "../util/util";
import {ErrorType, RowError, RowErrorCollection} from "./errorFeedback";

interface Row {
    "Gliederung": string;
    "Optional": string;
    "Befund": string;
    "Synonyme": string;
    "Normal": string;
    "Default": string;
    "Choice-Gruppe-ID": string;
    "Aufzählung-ID": string;
    "Ausschluss Befund": string;
    "Variable-ID": string;
    "Variable-Typ": string;
    "Variable-Synonyme": string;
    "Variable-Default": string;
    "Variable-Info": string;
    "Text Befund": string;
    "Text Beurteilung": string;
}

const unwantedCharacters: RegExp[] = [new RegExp("\\\\[^n]")];
const varInfoSeparator: string = "...";

export function parseXLSToJson(binary_string: string, docKind: string): string | RowErrorCollection {
    // get workbook from binary string
    const wb: XLSX.IWorkBook = XLSX.read(binary_string, {type: "binary"});

    // select first sheet
    const worksheet_name: string = wb.SheetNames[0];
    const ws: XLSX.IWorkSheet = wb.Sheets[worksheet_name];

    // get rows as json objects
    const jsonSheet = XLSX.utils.sheet_to_json(ws)
    const rows = jsonSheet as Row[];

    const parts: TopLevel[] = [];

    let errorCollection = new RowErrorCollection();
    for (const row of rows) {
        let rowErrorTypes = getErrorTypesInRow(row, docKind === "shallowDoc")
        // + 2 because zero index and header is skipped
        let rowIndex = rows.indexOf(row) + 2;
        for (let errorType of rowErrorTypes) {
            errorCollection.addError(new RowError(rowIndex, errorType))
        }
    }
    if (errorCollection.errorList.length > 0) {
        return errorCollection
    }

    // if everything is fine, we can parse
    let i = 0;
    while (i < rows.length) {
        const row = rows[i];
        if (row["Gliederung"] === "Block") {
            parts.push(extractBlock(row));
            i++;
        } else if (row["Gliederung"] === "Aufzählung") {
            parts.push(extractEnumeration(row));
            i++;
        } else if (row["Gliederung"] !== undefined) {
            const relevantRows: Row[] = [];
            relevantRows.push(row);
            let j = i + 1;
            for (; j < rows.length; j++) {
                const subRow = rows[j];
                //Add rows below start of "Gliederung" until new Gliederung or Block / Enumeration starts
                if (subRow["Gliederung"] != undefined) {
                    break;
                }
                relevantRows.push(subRow)
            }
            i = j;
            parts.push(extractCategory(relevantRows));
        }
    }

    let final: string = JSON.stringify(parts)
    // remove double escaping of newline characters
    final = final.split("\\\\").join("\\")
    return final
}

function rowContainsUnwantedCharacters(row: Row): boolean {
    // get all row keys
    let key: keyof typeof row;

    // first iterate through all unwanted character regexes
    for (const rx of unwantedCharacters) {
        // iterate through keys
        for (key in row) {
            if (rx.test(key as string)) {
                return true;
            }
            if (rx.test(row[key])) {
                return true;
            }
        }
    }

    return false;
}

function getErrorTypesInRow(row: Row, shallow: boolean): ErrorType[] {
    let foundErrorTypes = []
    if (rowContainsUnwantedCharacters(row)) {
        foundErrorTypes.push(ErrorType.INVALID_CHARACTER)
    }
    // Wenn Gliederung ausgefüllt, dann darf Befund nicht leer sein (außer bei Block und Aufzählung)
    if (row["Gliederung"] !== undefined && row["Gliederung"] !== "Block" && row["Gliederung"] !== "Aufzählung"
        && row["Befund"] === undefined) {
        foundErrorTypes.push(ErrorType.MISSING_REPORT_FOR_STRUCTURE)
    }

    // Wenn optional markiert, dann darf Gliederung nicht leer sein
    if (row["Optional"] !== undefined && row["Gliederung"] === undefined) {
        foundErrorTypes.push(ErrorType.MISSING_STRUCTURE)
    }

    // Wenn Befund angegeben ist, dürfen Synonyme nicht leer sein
    if ((row["Befund"] !== undefined && row["Synonyme"] === undefined)) {
        foundErrorTypes.push(ErrorType.MISSING_SYNONYMS)
    }

    // Wenn Befund leer, aber Eigenschaften von Befund ausgefüllt, Fehler, aber nur wenn nicht Aufzählung oder Block
    if ((row["Synonyme"] !== undefined || row["Normal"] !== undefined || row["Default"] !== undefined
            || row["Choice-Gruppe-ID"] !== undefined || row["Aufzählung-ID"] !== undefined
            || row["Ausschluss Befund"] !== undefined) && row["Befund"] === undefined
        && (row["Gliederung"] !== "Aufzählung" && row["Gliederung"] !== "Block")) {
        foundErrorTypes.push(ErrorType.MISSING_REPORT_FOR_ATTRIBUTES)
    }

    // Wenn Befund oder Beurteilung Text angegeben ist, darf Befund nicht leer sein, außer bei Block und Aufzählung
    if ((row["Gliederung"] !== "Block" && row["Gliederung"] !== "Aufzählung")
        && (row["Text Befund"] !== undefined || row["Text Beurteilung"] !== undefined)
        && row["Befund"] === undefined) {
        foundErrorTypes.push(ErrorType.MISSING_REPORT_FOR_REPORT_TEXT)
    }

    // Wenn Variable angegeben, dann muss Variable-ID angegeben sein und umgekehrt
    if ((row["Variable-ID"] !== undefined && row["Variable-ID"] === undefined)
        || row["Variable-ID"] === undefined && row["Variable-Typ"] !== undefined) {
        foundErrorTypes.push(ErrorType.MISSING_VARIABLE_OR_ID)
    }

    // Wenn Eigenschaften von Variable angegeben, dürfen Variable-ID und -Typ nicht leer sein
    if ((row["Variable-Synonyme"] !== undefined || row["Variable-Default"] !== undefined ||
            row["Variable-Info"] !== undefined)
        && (row["Variable-ID"] === undefined || row["Variable-Typ"] == undefined)) {
        console.log("Error 7");
        foundErrorTypes.push(ErrorType.MISSING_VARIABLE_ID_OR_TYPE)
    }

    // Wenn Variable-Typ Text, Zahl oder Datum, darf Variable-Info nicht leer sein
    if ((row["Variable-Typ"] === "Text" || row["Variable-Typ"] === "Zahl" || row["Variable-Typ"] === "Datum")
        && row["Variable-Info"] === undefined) {
        foundErrorTypes.push(ErrorType.MISSING_VARIABLE_ID_OR_TYPE)
    }

    // Wenn Variable-Info vorhanden sind, müssen Punkte (oder Ellipse) angegeben sein für Variablenpos.
    if (row["Variable-Info"] !== undefined
        && (!row["Variable-Info"].includes("...") && !row["Variable-Info"].includes("\u2026"))) {
        foundErrorTypes.push(ErrorType.MISSING_ELLIPSE_FOR_VARIABLE)
    }

    // Die folgenden Bedingungen nur für shallow Templates
    if (shallow) {
        // Radio Buttons sind nicht erlaubt
        if (row["Choice-Gruppe-ID"] !== undefined) {
            console.log("Error 10");
            foundErrorTypes.push(ErrorType.INVALID_RADIO_BUTTON)
        }

        // Es darf keine Text-, Zahl- oder Datums-Variablen geben
        if (["Text", "Zahl", "Datum"].includes(row["Variable-Typ"])) {
            foundErrorTypes.push(ErrorType.INVALID_VARIABLE_TYPE)
        }
    }
    return foundErrorTypes
}


export function extractBlock(row: Row): Block {
    const judgementText = row["Text Beurteilung"] == undefined ? undefined : row["Text Beurteilung"]
    const text = row["Text Befund"]
    return {
        kind: "block",
        text: text,
        judgementText: judgementText
    };
}

export function extractEnumeration(row: Row): Enumeration {
    const judgementText = row["Text Beurteilung"] == undefined ? undefined : row["Text Beurteilung"];
    return {
        kind: "enumeration",
        text: row["Text Befund"],
        judgementText: judgementText,
        id: row["Aufzählung-ID"]
    }
}

export function extractCategory(rows: Row[]): Category {
    const selectables: Selectable[] = [];
    let i = 0;
    while (i < rows.length) {
        const row = rows[i];
        if (row["Choice-Gruppe-ID"] != undefined) {
            // Find relevant rows for group that starts here, and extract group
            const relevantRows = new Array<Row>();
            let j = i + 1;
            const currentChoiceGroup = row["Choice-Gruppe-ID"];
            relevantRows.push(row)
            for (; j < rows.length; j++) {
                const subRow = rows[j]
                // new choice group
                if (subRow["Choice-Gruppe-ID"] != undefined && subRow["Choice-Gruppe-ID"] != currentChoiceGroup) break;
                // new TopLevel
                if (subRow["Gliederung"] != undefined) break;
                // checkbox
                if (subRow["Choice-Gruppe-ID"] == undefined && subRow["Befund"] != undefined) break;
                relevantRows.push(subRow);
            }
            i = j;
            const group = extractGroup(relevantRows);
            selectables.push(group)
        } else {
            //Find relevant rows for checkbox that starts here, and extract checkbox
            const relevantRows = new Array<Row>();
            let j = i + 1;
            relevantRows.push(row)
            for (; j < rows.length; j++) {
                const subRow = rows[j];
                if (subRow["Befund"] != undefined || subRow["Gliederung"] != undefined) break;
                relevantRows.push(subRow)
            }
            i = j;
            const box = extractBox(relevantRows);
            selectables.push(box)
        }
    }
    const optional = rows[0]["Optional"] != undefined
    return {
        kind: "category",
        name: rows[0]["Gliederung"].trim(),
        optional: optional,
        selectables: selectables
    };
}

export function extractGroup(rows: Row[]): Group {
    const options: Option[] = [];
    let i = 0;
    while (i < rows.length) {
        const row = rows[i]
        const relevantRows: Row[] = [];
        relevantRows.push(row)

        let j = i + 1
        for (; j < rows.length; j++) {
            const subRow = rows[j]
            if (subRow["Choice-Gruppe-ID"] != undefined) break;
            relevantRows.push(subRow)
        }
        i = j;
        const option = extractOption(relevantRows)
        options.push(option)
    }
    return {
        kind: "group",
        name: rows[0]["Choice-Gruppe-ID"].trim(),
        options: options,
        value: undefined
    };
}

export function extractOption(rows: Row[]): Option {
    const variables = extractSelectableVariables(rows);
    const keys = extractSelectableKeys(rows);
    const text = rows[0]["Text Befund"]
    const judgementText = rows[0]["Text Beurteilung"] == undefined ? undefined : rows[0]["Text Beurteilung"]
    return {
        keys: keys,
        kind: "option",
        name: rows[0]["Befund"].trim(),
        normal: rows[0]["Normal"] != undefined,
        text: text,
        variables: variables,
        judgementText: judgementText
    }
}

function extractSelectableVariables(rows: Row[]): Variable[] {
    const variables: Variable[] = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (row["Variable-Typ"] != undefined) {
            variables.push(extractVariable(row))
        }
    }
    return variables
}

function extractSelectableKeys(rows: Row[]): string[] {
    let keys: string[] = [];
    if (rows[0]["Synonyme"] !== undefined) {
        keys = trimArray(rows[0]["Synonyme"].split(";"))
    }
    return keys;
}

function extractBox(rows: Row[]): CheckBox {
    const variables = extractSelectableVariables(rows)
    const keys = extractSelectableKeys(rows)

    const judgementText = rows[0]["Text Beurteilung"] == undefined ? undefined : rows[0]["Text Beurteilung"]
    const enumeration = rows[0]["Aufzählung-ID"] == undefined ? undefined : rows[0]["Aufzählung-ID"]

    const exclusions = rows[0]["Ausschluss Befund"] == undefined ?
        undefined : trimArray(rows[0]["Ausschluss Befund"].split(","));

    return {
        kind: "box",
        name: rows[0]["Befund"].trim(),
        value: rows[0]["Default"] != undefined,
        normal: rows[0]["Normal"] != undefined,
        exclusions: exclusions,
        variables: variables,
        keys: keys,
        text: rows[0]["Text Befund"],
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
    } else if (row["Variable-Typ"] === "Text") {
        return extractVariableText(row, variable)
    } else if (row["Variable-Typ"].includes("/")) {
        return extractVariableOC(row, variable)
    } else if (row["Variable-Typ"] === "Datum") {
        return extractVariableDate(row, variable)
    } else {
        return extractVariableMC(row, variable)
    }
    // TODO: Add error statement here for parsing errors
    // TODO: Then add semicolon requirement for MC back in
}

function extractVariableOC(row: Row, variable: VariableCommon): VariableOC {
    const parsed = variable as VariableOC;
    parsed.kind = "oc";
    parsed.values = trimArray(row["Variable-Typ"].split("/"));
    parsed.value = null as any;
    if (row["Variable-Default"] !== undefined) {
        const varDefault = row["Variable-Default"].trim();
        if (parsed.values.includes(varDefault)) {
            parsed.value = varDefault
        } else {
            console.log(varDefault + "is not part of the provided options!")
        }
    }

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
    if (row["Variable-Default"] !== undefined) {
        parsed.value = row["Variable-Default"].trim();
    }
    return parsed
}

function extractVariableNumber(row: Row, variable: VariableCommon): VariableNumber {
    const parsed = variable as VariableNumber;
    parsed.kind = "number";
    parsed.value = 0;
    if (row["Variable-Default"] !== undefined) {
        const varDefault = row["Variable-Default"].trim();
        if (isNumber(varDefault)) {
            parsed.value = Number(varDefault);
        } else {
            console.log(varDefault + "is not a number");
        }

    }
    return parsed;
}

function extractVariableDate(row: Row, variable: VariableCommon): VariableDate {
    const parsed = variable as VariableDate;
    parsed.value = {
        year: 2019,
        month: 1,
        day: 1
    }
    parsed.kind = "date";
    return parsed;
}

function extractVariableKeys(row: Row): string[][] {
    const valueString = row["Variable-Typ"].trim()
    const excludeVariableTypes = ["Zahl", "Zahlbruch", "Text"]
    if (excludeVariableTypes.includes(valueString)) {
        return new Array<string[]>()
    }
    const keys = new Array<string[]>();
    const keysString = row["Variable-Synonyme"]
    const isOC = row["Variable-Typ"].includes("/")
    const valueSeparator = isOC ? "/" : ";"
    const synonymSeparator = isOC ? ";" : ","
    if (keysString == undefined) {
        const textValues = trimArray(row["Variable-Typ"].split(valueSeparator))
        for (let i = 0; i < textValues.length; i++) {
            keys.push(new Array<string>())
            keys[i].push(textValues[i])
        }
        return trim2DArray(keys)
    }
    const variableKeyStrings = keysString.split(valueSeparator)
    for (let i = 0; i < variableKeyStrings.length; i++) {
        keys.push(new Array<string>())
        const synonyms = variableKeyStrings[i].split(synonymSeparator)
        for (let j = 0; j < synonyms.length; j++) {
            keys[i].push(synonyms[j])
        }
    }
    return trim2DArray(keys)
}

function extractTextBefore(varInfo: string): string {
    if (varInfo === undefined) {
        return "";
    }
    varInfo = varInfo.replace("\u2026", varInfoSeparator);
    return varInfo.split(varInfoSeparator)[0];
}

function extractTextAfter(varInfo: string): string {
    if (varInfo === undefined) {
        return "";
    }
    varInfo = varInfo.replace("\u2026", varInfoSeparator);
    if (varInfo.split(varInfoSeparator).length < 2) {
        return "";
    }
    return varInfo.split(varInfoSeparator)[1];
}

