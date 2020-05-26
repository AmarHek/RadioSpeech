import { Injectable } from '@angular/core';
import { InputParserService } from './input-parser.service';
import { parse } from 'querystring';
import { Key } from 'protractor';
import{Keyword2, Category, Disease, TextDic} from './text/Keyword';

@Injectable({
  providedIn: 'root'
})
export class TextOutputService {

  constructor() {
   }
  // Array containing the text for each category
  myReport: {report: string, category: string}[] = [];
  rep: Array<TextDic> = [];
  // produces the text output


  makeReport(activeCat: Category, activeDis: Disease){
    // this.report.text="";
    // gets active Category
    let repo = "";
    // adds text corresponding to active Keywords
    if(activeDis != undefined){
    for (const key of activeCat.keys.filter(key => key.position!==-1)){
      repo += key.text;
      if(key.VarFound != undefined){
      for(let i = 0; i< key.VarFound.length; i++){
        if(key.VarFound[i] != undefined && i == 0){
          repo = repo.slice(0,-2) + " " + key.VarFound[i];
        } else if (key.VarFound[i] != undefined && i == 1){
          repo = repo + " " + key.VarFound[i];
        }
      }
    }
    }
    // assigns text to corresponding array element
    this.rep.find(dis => dis.disName == activeDis.name).reports.find(cat => cat.category == activeCat.name).text = repo;
    console.log("repo");
    console.log(this.rep.find(dis => dis.disName == activeDis.name).reports.find(cat => cat.category == activeCat.name).text);
    }
    // concatenate all text elements from the array
    let finalText = "";
    for(const dis of this.rep){
      if(dis.reports.map(report => report.text).join("") !== ""){
        finalText = finalText + dis.disName+ ":\n";
      }
      finalText = finalText + dis.reports.map(report => report.text).join("") + "\n\n";
    }
    
    return finalText;
  }

  // shows which keywords were detected and are written into the text output
  colorTextInput(diseases: Array<Disease>, input: string){
    let inByWord : string[] = [];
    for(const dis of diseases){
      if(input.toLowerCase().indexOf(dis.name.toLowerCase()) !== -1){
      inByWord.push("<span style=\"background-color: yellow; text-decoration: underline\">" + dis.name + "</span>");
      }
    for(const cat of dis.categories){
      var activeKeys = cat.keys.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
      // loops through all active Keywords
      for (const key of activeKeys){
        // if keyword does hold a variable it will be darkgreen and its variable will be lightgreen
        if(key.VarType != undefined && key.VarFound[0]!= undefined){
          inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
          inByWord.push("<span style=\"background-color: lightgreen\">" + key.VarFound.join(" ") + "</span>");
        // if keyword can hold a variable but doesnt hold it, it will be red
        } else if(key.VarType != undefined){
          inByWord.push("<span style=\"background-color: red\">" + key.name + "</span>");
          if(key.VarFound != undefined){
            inByWord.push("<span style=\"background-color: lightgreen\">" + key.VarFound.join(" ") + "</span>");
          }
        // if keyword can't hold a variable, it will be darkgreen
        } else {
          inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
          if(key.VarFound != undefined){
          inByWord.push("<span style=\"background-color: lightgreen\">" + key.VarFound.join(" ") + "</span>");
          }
        }
      }
    }
  }
    // assigns text to element on html
    document.getElementById("inputText").innerHTML = inByWord.join(" ");
  }

  initDiseaseText(diseases: Array<Disease>){
    for(const dis of diseases){
      let tempReports : {text: string, category: string}[] = [];
      for(const cat of dis.categories){
        tempReports.push({text: "", category: cat.name});
      }
      this.rep.push({disName: dis.name, reports: tempReports});
    }
  console.log("initDicTest");
  console.log(this.rep);
  }

  addDisease(disease: Disease, index: number){
    let tempReports : {text: string, category: string}[] = [];
    for(const cat of disease.categories){
      tempReports.push({text: "", category: cat.name});
    }
    this.rep.splice(index, 0, {disName: disease.name, reports: tempReports})
  }

  
}
