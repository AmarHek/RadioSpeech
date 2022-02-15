import * as Path from "path";
import * as fs from "fs";
import {TemplateDB} from "./models";
import { createJSONTemplate } from "./controllers"

// on app start, initialize all relative directories for file saving etc.
export function initDirectories() {
    if (!fs.existsSync(Path.join(process.cwd(), "data"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data"));
    }
    if (!fs.existsSync(Path.join(process.cwd(), "data/images"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data/images"));
    }
}

export function loadDefaultTemplates() {
    if (!fs.existsSync(Path.join(process.cwd(), "src/assets/Radiolearn.json"))) {
        console.warn("Radiolearn.json asset missing!")
    } else {
        TemplateDB.countDocuments({name: "Radiolearn"}, (err, count) => {
            if (count === 0) {
                console.log("Radiolearn missing from database. Adding entry from assets.");

            }
        })
    }
}
