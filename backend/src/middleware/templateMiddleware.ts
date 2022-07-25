import {Template, TopLevel} from "../models/template.model";


export function validateTemplate(JSONdata: JSON): boolean {
    // TODO implement validator
    return true;
}

function validateCategory(): boolean {
    return true;
}

export function extractKeys(parts: TopLevel[]): TopLevel[] {
    for (const el of parts) {
        if (el.kind === "category") {
            for (const sel of el.selectables) {

            }
        }
    }


    return parts;
}