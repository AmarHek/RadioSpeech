import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FilesSortingService {

  identifier: RegExp;

  constructor() {
    this.identifier = new RegExp("thisShouldNotMatchAnything");
  }

  setIdentifier(id: string) {
    if (id.length === 0) {
      this.identifier = new RegExp(".*");
    } else {
      // TODO: Currently only string + n integers possible, make more report-output-options available
      const nIntegers = (id.split("*").length - 1);
      const preString = id.split("*").join("");
      this.identifier = new RegExp("^" + preString + "\\d{" + nIntegers + "}" + "\\D");
    }
  }

  // searches for the identifier in filenames and returns boolean value based on if a match is found or not
  identifierSearch(files: File[]): boolean[]  {
    return files.map((file: File) => this.identifier.test(file.name));
  }

  fileMatchSearch(baseFiles: File[], checkFiles: File[]): boolean[] {
    return checkFiles.map((file: File) => baseFiles.some((baseFile: File) => {
      const match = baseFile.name.match(this.identifier);
      if (file.name === baseFile.name) {
        return false;
      }
      if (match !== null && match !== undefined) {
        const id = match[0];
        return file.name.includes(id);
      } else {
        return false;
      }
    }));
  }

  getFileTuples(baseFiles: File[], checkFiles1?: File[], checkFiles2?: File[]): [File, File, File][] {
    if (checkFiles1 === undefined) {
      checkFiles1 = [];
    }
    if (checkFiles2 === undefined) {
      checkFiles2 = [];
    }
    const result: [File, File, File][] = [];

    for (const baseFile of baseFiles) {
      const match = baseFile.name.match(this.identifier);
      if (match !== undefined) {
        const id = match[0];
        const checkFile1 = checkFiles1.find(file => file.name.includes(id));
        const checkFile2 = checkFiles2.find(file => file.name.includes(id));
        result.push([baseFile, checkFile1, checkFile2]);
        // TODO: Maybe add removal of already pushed files
      }
    }

    return result;
  }


}
