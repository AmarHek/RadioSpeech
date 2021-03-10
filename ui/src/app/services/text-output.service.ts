import { Injectable } from '@angular/core';
import { InputParserService } from './input-parser.service';
import { parse } from 'querystring';
import { Key } from 'protractor';
import { Keyword2, Category, Disease, TextDic } from './text/Keyword';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TextOutputService {

  constructor(private sanitizer: DomSanitizer) {
  }
  // Array containing the text for each disease and category
  rep: Array<TextDic> = [];
  // time when finished
  timeSpan: number = 0;
  // all the recognised words that were entered, used for correction mode
  recogWords: { word: string, pos: number }[] = [];
  // url for json download
  downJson: SafeUrl;
  // url for report file download
  downJson2: SafeUrl;
  // final output text, contains all the text from rep Array
  finalText: string = "";

  // generates downloadable files from arrays
  generateDownloadJson() {
    var js = JSON.stringify(this.rep);
    console.log("Download!");
    console.log(js);
    var js2 = JSON.stringify(this.finalText);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(js));
    var uri2 = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(js2));
    this.downJson = uri;
    this.downJson2 = uri2;
  }

  // produces the text output
  makeReport(activeCat: Category, activeDis: Disease, startingTime: Date) {
    // this.report.text="";
    // gets active Category
    let repo = "";
    // adds text corresponding to active Keywords
    let keyName = "";
    if (activeDis != undefined) {
      for (const key of activeCat.keys.filter(key => key.position !== -1)) {
        let newText = key.text;
        keyName = key.name;
        if (activeCat.name === "Größe" || activeCat.name === "Gefäß") {
          newText = newText.replace('%0', key.synonym);
        }
        for (let i = 0; i < key.variables.length; i++) {
          //repo += key.text;
          if (key.variables[i].varFound.length != 0) {
            newText = newText.replace('%' + i, key.variables[i].varFound[0]);
          } else {
            newText = newText.replace('%' + i, "");
          }
        }
        repo += newText;
      }

      // assigns text to corresponding array element
      let report = this.rep.find(dis => dis.disName == activeDis.name).reports.find(cat => cat.category == activeCat.name);
      report.text = repo;
      report.key = keyName;
      console.log("repo");
      console.log(this.rep.find(dis => dis.disName == activeDis.name).reports.find(cat => cat.category == activeCat.name).text);
    }
    // concatenate all text elements from the array
    let finalText = "";
    // adds time stamp to the top of the report
    let date = new Date();
    finalText += date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + "\n\n";
    this.timeSpan = Math.abs(date.getTime() - startingTime.getTime()) / 1000;
    for (const dis of this.rep) {
      if (dis.reports.map(report => report.text).join("") !== "") {
        finalText = finalText + dis.disName + ":\n";
      }
      finalText = finalText + dis.reports.map(report => report.text).join("") + "\n\n";
    }
    this.finalText = finalText;
    return finalText;
  }

  // shows which keywords were detected and are written into the text output
  colorTextInput(diseases: Array<Disease>, input: string) {
    let inByWord: string[] = [];
    for (const dis of diseases) {
      if (input.toLowerCase().indexOf(dis.name.toLowerCase()) !== -1) {
        inByWord.push("<span style=\"background-color: yellow; text-decoration: underline\">" + dis.name + "</span>");
      }
      for (const cat of dis.categories) {
        // only lokalisierung and größe are shown on top
        if (cat.name === "Lokalisierung" || cat.name === "Größe") {
          var activeKeys = cat.keys.filter(activeKey => activeKey.position != -1).sort((a, b) => a.position - b.position);
          // loops through all active Keywords
          for (const key of activeKeys) {
            // if keyword does hold a variable it will be darkgreen and its variable will be lightgreen
            if (key.variables.length != 0) {
              let complete = true;
              let activeVars = 0;
              for (const vari of key.variables) {
                if (vari.varFound.length != 0) {
                  //inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
                  inByWord.push("<span style=\"background-color: lightgreen\">" + vari.varFound[0] + "</span>");
                  activeVars++;
                } else {
                  complete = false;
                }
              }
              if (complete) {
                inByWord.splice(inByWord.length - activeVars, 0, "<span style=\"background-color: #ffc0cb\">" + key.name + "</span>");
              } else {
                // if keyword can hold variables but doesnt hold all of them, it will be red
                inByWord.splice(inByWord.length - activeVars, 0, "<span style=\"background-color: red\">" + key.name + "</span>");
              }
              // if keyword can't hold a variable, it will be #ffc0cb
            } else {
              if (cat.name === "Größe") {
                inByWord.push("<span style=\"background-color: #ffc0cb\">" + key.synonym + "</span>");
              } else {
                inByWord.push("<span style=\"background-color: #ffc0cb\">" + key.name + "</span>");
              }
            }
          }
        }
      }
    }
    // assigns text to element on html
    document.getElementById("inputText").innerHTML = inByWord.join(" ");
  }

  // adds an entry at the output array for all different diseases (at beginning)
  initDiseaseText(diseases: Array<Disease>) {
    for (const dis of diseases) {
      let tempReports: { text: string, category: string, key: string }[] = [];
      for (const cat of dis.categories) {
        tempReports.push({ text: "", category: cat.name, key: "" });
      }
      this.rep.push({ disName: dis.name, reports: tempReports });
    }
    console.log("initDicTest");
    console.log(this.rep);
  }

  // adds an entry at the output array for all new instances (dynamic)
  addDisease(disease: Disease, index: number) {
    let tempReports: { text: string, category: string, key: string }[] = [];
    for (const cat of disease.categories) {
      tempReports.push({ text: "", category: cat.name, key: "" });
    }
    this.rep.splice(index, 0, { disName: disease.name, reports: tempReports })
  }

  // output for correction mode, uses recogWords array. Also automatically downloads the json and text after some milliseconds
  finalOut(end: boolean, inpAr: Array<string>) {
    /* if(end){
    console.log(this.recogWords);
    console.log(inpAr);
    } */
    if (end) {
      let k = 0;
      while (k < this.rep.length) {
        let empty = true;
        for (const cat of this.rep[k].reports) {
          if (cat.key !== "") {
            empty = false;
          }
        }
        if (empty) {
          this.rep.splice(k, 1);
        } else {
          k++;
        }
      }
      this.generateDownloadJson();
      var temp = 0;
      for (let j = 0; j < this.recogWords.length; j++) {
        let splitAr = this.recogWords[j].word.split(" ");

        let bool = true;
        temp = inpAr.indexOf(splitAr[0], temp);
        for (let i = 1; i < splitAr.length; i++) {
          if (inpAr[temp + i] !== splitAr[i]) {
            bool = false;
          }
        }
        if (bool) {
          for (let i = 0; i < splitAr.length; i++) {

            // console.log(temp);
            inpAr[temp + i] = "<span style=\"color: red; text-transform: uppercase\">" + inpAr[temp + i] + "</span>";
          }
          temp += splitAr.length;
        } else {
          temp++;

          j -= 1;
        }

      }
      console.log(inpAr);
      console.log(this.recogWords);
      inpAr.pop();
      document.getElementsByClassName("ende")[0].innerHTML = inpAr.join(" ");
    }

  }

}
