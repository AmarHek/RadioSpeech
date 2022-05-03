import * as Path from "path";
import * as fs from "fs";
import {PathologyDB, TemplateDB} from "./models";

export function initData() {
    console.log("Initializing directories...");
    initDirectories();
    console.log("...finished");

    console.log("Loading default Templates into database...")
    loadDefaultTemplates();
    console.log("...finished");

    console.log("Initializing default pathologies...")
    initPathologies().then(() => console.log("...finished"));

}

// on app start, initialize all relative directories for file saving etc.
function initDirectories() {
    if (!fs.existsSync(Path.join(process.cwd(), "data"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data"));
    }
    if (!fs.existsSync(Path.join(process.cwd(), "data/images"))) {
        fs.mkdirSync(Path.join(process.cwd(), "data/images"));
    }
}

// load default json files on startup (can be deleted from the database later)
function loadDefaultTemplates() {
    if (!fs.existsSync(Path.join(__dirname, "./assets/Radiolearn.json"))) {
        console.warn("Radiolearn.json missing!")
    } else {
        saveTemplate(Path.join(__dirname, "./assets/Radiolearn.json"), "Radiolearn");
    }

    if (!fs.existsSync(Path.join(__dirname, "./assets/RoentgenNormal.json"))) {
        console.warn("RoentgenNormal.json missing!")
    } else {
        saveTemplate(Path.join(__dirname, "./assets/RoentgenNormal.json"), "RöntgenNormal");
    }
}

function saveTemplate(path: string, name: string) {
    TemplateDB.countDocuments({name: name}, (err, count) => {
        if (count === 0) {
            console.log(name + " missing from database. Adding entry from assets.");
            const rawData = fs.readFileSync(path, "utf-8");
            const parts = JSON.parse(rawData);
            const template = new TemplateDB({
                parts: parts,
                name: name,
                timestamp: new Date()
            });
            template.save().then(res => {
                console.log("Successfully saved " + res.name);
            });

        }
    })
}

async function initPathologies() {
    if (!fs.existsSync(Path.join(__dirname, "./assets/pathology.json"))) {
        console.warn("pathology.json missing!")
    } else {
        console.log("Emptying pathology collection.");
        await PathologyDB.deleteMany({});
        const rawData = fs.readFileSync(Path.join(__dirname, "./assets/pathology.json"), "utf-8");
        const pathologies = JSON.parse(rawData);
        console.log(pathologies);
        console.log("Reading default pathologies from pathology.json asset.");
        for (const pathology of pathologies) {
            const newPathology = new PathologyDB({
                name: pathology.name,
                englishName: pathology.englishName,
                templateMaps: pathology.templateMaps
            });
            newPathology.save().then(res => {
                console.log("Successfully saved " + res.name);
            })
        }
    }
}