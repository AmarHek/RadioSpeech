
export enum TemplateErrorType {
    MISSING_REPORT_FOR_STRUCTURE = "Wenn Gliederung ausgefüllt, dann darf Befund nicht leer sein (außer bei Block und Aufzählung)",
    MISSING_STRUCTURE = "Wenn optional markiert, dann darf Gliederung nicht leer sein",
    MISSING_SYNONYMS = "Wenn Befund angegeben ist, dürfen Synonyme nicht leer sein",
    MISSING_REPORT_FOR_ATTRIBUTES = "Wenn Befund leer, aber Eigenschaften von Befund ausgefüllt, Fehler, aber nur wenn nicht Aufzählung oder Block",
    MISSING_REPORT_FOR_REPORT_TEXT = "Wenn Befund oder Beurteilung Text angegeben ist, darf Befund nicht leer sein, außer bei Block und Aufzählung",
    MISSING_VARIABLE_OR_ID = "Wenn Variable angegeben, dann muss Variable-ID angegeben sein und umgekehrt",
    MISSING_VARIABLE_ID_OR_TYPE = "Wenn Eigenschaften von Variable angegeben, dürfen Variable-ID und -Typ nicht leer sein",
    MISSING_VARIABLE_INFO = "Wenn Variable-Typ Text, Zahl oder Datum, darf Variable-Info nicht leer sein",
    MISSING_ELLIPSE_FOR_VARIABLE = "Wenn Variable-Info vorhanden sind, müssen Punkte (oder Ellipse) angegeben sein für Variablenpos.",
    INVALID_RADIO_BUTTON = "In Shallow Templates darf es keine Radio Buttons geben",
    INVALID_VARIABLE_TYPE = "In Shallow Templates darf es keine Text- Zahl oder Datums Variablen geben",
    INVALID_CHARACTER = "Unerlaubtes Textzeichen",
}

export class TemplateRowError {
    row: number;
    type: TemplateErrorType;

    constructor(row: number, type: TemplateErrorType) {
        this.row = row;
        this.type = type;
    }
}

export class TemplateRowErrorCollection {
    errorList: TemplateRowError[];
    reportHeadline = "Beim Parsen der Schablone sind folgende Fehler aufgetreten:\n"

    constructor() {
        this.errorList = [];
    }

    addError(error: TemplateRowError){
        this.errorList.push(error)
    }

    errorToID(error: TemplateRowError) : string {
        let keys = Object.keys(TemplateErrorType);
        let values = Object.values(TemplateErrorType);

        for (let value of values){
            if(value == error.type){
                return keys[values.indexOf(value)]
            }
        }
        return ""
    }

    getVerboseReport(){
        return this.reportHeadline + this.errorList.map(error => "Zeile " + error.row + ": " + error.type).join("\n")
    }

    getCompactReport(){
        return this.reportHeadline + this.errorList.map(error => "Zeile " + error.row + ": " + this.errorToID(error)).join("\n")
    }

}