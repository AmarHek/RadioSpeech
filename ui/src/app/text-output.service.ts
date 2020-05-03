import { Injectable } from '@angular/core';
import { InputParserService } from './input-parser.service';

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

  
}
