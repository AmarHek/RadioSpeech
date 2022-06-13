import * as fs from "fs";
import * as Path from "path";

export function generateUniqueFilename(path: string, name: string, extension: string): string {
    // checks if file already exists in path and adds incremental numbers
    if (fs.existsSync(Path.join(path, name + extension))) {
        let i = 1;
        while (i < 10000) {
            const newName = name + i;
            if (!fs.existsSync(Path.join(path, newName + extension))) {
                return newName + extension;
            } else {
                i = i + 1;
            }
        }
        return name + extension;
    } else {
        return name + extension;
    }
}