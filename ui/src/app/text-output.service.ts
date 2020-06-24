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
  recogWords : {word: string, pos: number}[] = [];


  // produces the text output
  makeReport(activeCat: Category, activeDis: Disease){
    // this.report.text="";
    // gets active Category
    let repo = "";
    // adds text corresponding to active Keywords
    if(activeDis != undefined){
      for (const key of activeCat.keys.filter(key => key.position!==-1)){
        let newText = key.text;
        for(let i = 0; i<key.variables.length; i++){
        //repo += key.text;
        if(key.variables[i].varFound.length != 0){
            newText = newText.replace('%'+i, key.variables[i].varFound[0]);
          } else{
            newText = newText.replace('%'+i, "");
          }
        }
        repo += newText;
      }  
    
    // assigns text to corresponding array element
    this.rep.find(dis => dis.disName == activeDis.name).reports.find(cat => cat.category == activeCat.name).text = repo;
    console.log("repo");
    console.log(this.rep.find(dis => dis.disName == activeDis.name).reports.find(cat => cat.category == activeCat.name).text);
    }
    // concatenate all text elements from the array
    let finalText = "";
    let date = new Date()
    finalText += date.getDate() + "." + date.getMonth() +"." + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + "\n\n";
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
        if(key.variables.length != 0){
          let complete = true;
          let activeVars = 0;
          for(const vari of key.variables){
            if(vari.varFound.length != 0){
              //inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
              inByWord.push("<span style=\"background-color: lightgreen\">" + vari.varFound[0] + "</span>");
              activeVars++;
            } else {
              complete = false;
            }
          }
          if(complete){
            inByWord.splice(inByWord.length-activeVars, 0, "<span style=\"background-color: darkgreen\">" + key.name + "</span>");
          } else{
            // if keyword can hold variables but doesnt hold all of them, it will be red
            inByWord.splice(inByWord.length-activeVars, 0, "<span style=\"background-color: red\">" + key.name + "</span>");
          }
        // if keyword can't hold a variable, it will be darkgreen
        } else {
          inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
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

  finalOut(end: boolean, inpAr: Array<string>){
    /* if(end){
    console.log(this.recogWords);
    console.log(inpAr);
    } */
    if(end){
      var temp = 0;
      for (let j = 0; j<this.recogWords.length; j++){
        let splitAr = this.recogWords[j].word.split(" ");
        
        let bool = true;
        temp = inpAr.indexOf(splitAr[0], temp);
        for(let i = 1; i<splitAr.length; i++){
          if(inpAr[temp+i] !== splitAr[i]){
            bool = false;
          }
        }
        if(bool){
          for(let i = 0; i<splitAr.length; i++){
            
           // console.log(temp);
            inpAr[temp+i] = "<span style=\"color: red; text-transform: uppercase\">" + inpAr[temp+i] + "</span>";
          }
          temp += splitAr.length;
        } else {
          temp++;
          console.log("pimmel2");
          j -= 1;
        }
      
      }
      console.log(inpAr);
      console.log(this.recogWords);
      inpAr.pop();
      document.getElementsByClassName("ende")[0].innerHTML = inpAr.join(" ");
      console.log("41");
    }
  
  }

}
