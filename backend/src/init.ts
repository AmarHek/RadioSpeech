import * as Path from "path";
import * as fs from "fs";
import {TemplateDB} from "./models";

export function initData() {
    console.log("Initializing directories...");
    initDirectories();
    console.log("...finished");

    console.log("Loading default Templates into database...")
    loadDefaultTemplates().then(() => console.log("...finished"));

}

// on app start, initialize all relative directories for file saving etc.
function initDirectories() {
    if (!fs.existsSync(Path.join(process.cwd(), "data"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data"));
    }
    if (!fs.existsSync(Path.join(process.cwd(), "data/images"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data/images"));
    }
    if (!fs.existsSync(Path.join(process.cwd(), "data/excels"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data/excels"));
    }
    if (!fs.existsSync(Path.join(process.cwd(), "data/json"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data/json"));
    }
}

// load default json files on startup (can be deleted from the database later)
async function loadDefaultTemplates() {
    if (!fs.existsSync(Path.join(__dirname, "./assets/Radiolearn.json"))) {
        console.warn("Radiolearn.json missing!")
    } else {
        console.log("Removing old Radiolearn.json");
        await TemplateDB.deleteOne({name: "Radiolearn"});
        saveTemplate(Path.join(__dirname, "./assets/Radiolearn.json"), "Radiolearn");
    }

    if (!fs.existsSync(Path.join(__dirname, "./assets/RöntgenNormal.json"))) {
        console.warn("XrayNormal.json missing!")
    } else {
        saveTemplate(Path.join(__dirname, "./assets/RöntgenNormal.json"), "RöntgenNormal");
    }
}

function saveTemplate(path: string, name: string) {
    TemplateDB.countDocuments({name: name}, {}, (err, count) => {
        if (count === 0) {
            console.log("Adding " + name + " from assets..");
            const rawData = fs.readFileSync(path, "utf-8");
            const metaData = fs.statSync(path);
            const timestamp = (new Date(metaData.mtime)).getTime();
            const parts = JSON.parse(rawData);
            const template = new TemplateDB({
                parts: parts,
                name: name,
                kind: "deepDoc",
                timestamp
            });
            template.save().then(res => {
                console.log("Successfully saved " + res.name);
            });
        }
    })
}
