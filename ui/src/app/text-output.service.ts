import { Injectable } from '@angular/core';
import { InputParserService } from './input-parser.service';
import { parse } from 'querystring';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TextOutputService {

  constructor() {
   }
  myReport: {report: string} = {report: ""};
  makeReport(parsedKeys: any){
    // this.report.text="";
    this.myReport.report = "";
    for (const key of parsedKeys.filter(key => key.position!==-1)){
      this.myReport.report += key.text;
      if(key.VarFound != undefined){
         this.myReport.report += key.TextBefore + key.VarFound + key.TextAfter;
      }
    }
  }

  colorTextInput(input:string, parsedKeys: any){
    let inByWord : string[] = [];
    var activeKeys = parsedKeys.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
    for (const key of activeKeys){
      if(key.VarType != undefined && key.VarFound!= undefined){
        inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
        inByWord.push("<span style=\"background-color: lightgreen\">" + key.TextBefore + key.VarFound + "</span>")
      } else if(key.VarType != undefined){
        inByWord.push("<span style=\"background-color: red\">" + key.name + "</span>");
      }
      else {
        inByWord.push("<span style=\"background-color: darkgreen\">" + key.name + "</span>");
      }
    }
    
    document.getElementById("inputText").innerHTML = inByWord.join(" ");
  }

  
}
