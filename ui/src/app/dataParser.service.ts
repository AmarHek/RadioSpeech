import { Injectable } from '@angular/core';
import * as M from './model';

@Injectable({
  providedIn: 'root'
})

export class DataParserService {

  keywords: string[] = [];

  constructor() {}

  parseRawPartsLayout1(rawParts: M.TopLevel[]): M.Category[]{
    let parts = [];
    let currentBlock: M.Block = null;
    let currentEnum: M.Enumeration = null;
    for(let el of rawParts){
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
          data: el.data,
        })
        currentBlock = null;
        currentEnum = null;
      }
      else {
        console.log(el);
        window.alert("Error during parsing of parts: unknown kind");
      }
    }

    this.extractKeywords(parts);

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

  // TODO
  extractKeywords(parts: M.Category[]) {
    for(const part of parts){
      for(const keyword of part.data.bau){
        this.keywords.push(keyword);
      }
    }
  }


}
