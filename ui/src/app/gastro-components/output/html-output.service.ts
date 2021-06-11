import { Injectable } from "@angular/core";
import {InputParserService} from "../input-parser.service";
import {getAllIndexOf, splitStringFromIndexes} from "../../../helper-classes/util";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HtmlOutputService {

  public images: Array<string> = [];
  public texts: Array<string> = [];
  public reports: Array<string> = [];
  public dateAndTime = "11.06.2021  16:30";

  constructor(private inputParser: InputParserService) { }

  readImages(imagefiles: Array<File>) {
    this.images = [];
    for (const file of imagefiles) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (_event) => {
        this.images.push(reader.result as string);
      };
    }
    console.log(this.images);
  }

  async readText(textfiles: Array<File>) {
    this.texts = [];
    for (const file of textfiles) {
      const text = await file.text();
      this.texts.push(text);
    }
    this.splitDiseases();
  }

  splitDiseases() {
    let splitTexts: string[] = [];
    const diseases = ["polyp", "divertikulose"];
    for (const text of this.texts) {
      let indexes: number[] = [];
      for (const disease of diseases) {
        indexes = indexes.concat(getAllIndexOf(disease, text, false));
      }
      splitTexts = splitTexts.concat(splitStringFromIndexes(text, indexes));
    }
    this.texts = splitTexts;
  }

  parseText() {
    if (this.texts.length > 0) {
      this.reports = [];
      for (const text of this.texts) {
        console.log(text);
        this.reports.push(this.inputParser.parseInput(text));
      }
      console.log(this.reports);
    } else {
      console.log("No text files available.");
    }
  }

  submitAndDownload(): void {
  }

  generateHtml() {
    if (this.texts.length > 0 && this.images.length > 0) {
      let element;
    } else {
      alert("Keine Bilder oder keine Texte hochgeladen");
    }
  }
}
