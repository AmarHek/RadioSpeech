import { Injectable } from '@angular/core';
import * as M from './model';
import * as P from './parser';
import { Keyword2, Category, Disease, MyVariable } from './text/Keyword';
import { TextOutputService } from './text-output.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable({
  providedIn: 'root'
})

export class DataBuilderService {

  constructor() {}

  parseRawParts(raw: M.TopLevel[]){
    let parts: M.TopLevel[] = [];
    let currentBlock: M.Block = null;
    let currentEnum: M.Enumeration = null;
    for(let el of raw){
      if(el.kind === "block"){
        currentBlock = el;
      }
      else if(el.kind === "enumeration"){
        currentEnum = el;
      }
      else if(el.kind === "category"){
        let parsed = this.parseOptionalCategory(el.name);
        parts.push({
          kind: "category",
          name: parsed[0],
          optional: parsed[1],
          block: currentBlock,
          enum: currentEnum,
          selectables: el.selectables,
          selectablesNormal: el.selectablesNormal,
          data: el.data,
        })
        currentBlock = null;
        currentEnum = null;
      }
      else {
        console.log(el);
        window.alert("Error during parsing of parts: unkown kind");
      }
    }

    return parts;
  }

  // TODO: remove once backend is updated
  parseOptionalCategory(category: string): [string, boolean] {
    if(category.includes("<", 0)){
      return [category.substring(1, category.length), true];
    }
    else{
      return [category, false];
    }
  }


}
