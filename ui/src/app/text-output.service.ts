import { Injectable } from '@angular/core';
import { InputParserService } from './input-parser.service';
import { parse } from 'querystring';
import { Key } from 'protractor';
import{Keyword2, Category} from './text/Keyword';

@Injectable({
  providedIn: 'root'
})
export class TextOutputService {

  constructor() {
   }
  // Array containing the text for each category
  myReport: {report: string, category: string}[] = [];

  // produces the text output
  makeReport(polyp: Array<Category>){
    // this.report.text="";
    // gets active Category
    if(polyp.find(cat => cat.active == true)!=undefined){
    let activeCat = polyp.find(cat => cat.active == true);
    let repo = "";
    // checks if report array already holds this category
    if(this.myReport.find(cat => cat.category == activeCat.name) == undefined){
      // case1: array doesnt already hold this category
      // adds text corresponding to active Keywords
      for (const key of activeCat.keys.filter(key => key.position!==-1)){
        repo += key.text;
        if(key.VarFound != undefined){
           repo += key.TextBefore + key.VarFound + key.TextAfter;
        }
      }
      this.myReport.push({report: repo, category: activeCat.name});
      // case2: array does already hold this category
    } else {
      // adds text corresponding to active Keywords
      for (const key of activeCat.keys.filter(key => key.position!==-1)){
        repo += key.text;
        if(key.VarFound != undefined){
           repo += key.TextBefore + key.VarFound + key.TextAfter;
        }
      }
      // assigns text to corresponding array element
      this.myReport.find(cat => cat.category == activeCat.name).report = repo;
    }
    // concatenate all text elements from the array
    return this.myReport.map(rep => rep.report).join(". ");
    }
    else return "";
  }

  // shows which keywords were detected and are written into the text output
  colorTextInput(polyp: Array<Category>){
    let inByWord : string[] = [];
    for(const cat of polyp){
      var activeKeys = cat.keys.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
      // loops through all active Keywords
      for (const key of activeKeys){
        // if keyword does hold a variable it will be darkgreen and its variable will be lightgreen
        if(key.VarType != undefined && key.VarFound!= undefined){
          inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
          inByWord.push("<span style=\"background-color: lightgreen\">" + key.TextBefore + key.VarFound + "</span>")
        // if keyword can hold a variable but doesnt hold it, it will be red
        } else if(key.VarType != undefined){
          inByWord.push("<span style=\"background-color: red\">" + key.name + "</span>");
        }
        // if keyword can't hold a variable, it will be darkgreen
        else {
          inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
        }
      }
    }
    // assigns text to element on html
    document.getElementById("inputText").innerHTML = inByWord.join(" ");
  }

  
}
