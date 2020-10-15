import { Injectable } from "@angular/core";
import * as M from "./model";
import {HttpClient} from "@angular/common/http";
import * as G from "./generator";

@Injectable({
  providedIn: "root"
})

export class DataParserService {

  keywords: string[] = [];

  constructor() {}

  parseLayout1(parts: M.TopLevel[], maxRowLength: number): M.Category[] {
    const res = [];
    for(const el of parts) {
      if (el.kind === "category"){
        if(el.selectables.length > maxRowLength){
          let split_cats = this.splitCategory(el, maxRowLength);
          for(let cat of split_cats){
            const parsed = this.parseOptionalCategory(cat.name);
            res.push({
              kind: "category",
              name: parsed[0],
              optional: parsed[1],
              selectables: cat.selectables,
              data: cat.data,
            });
          }
        } else {
          const parsed = this.parseOptionalCategory(el.name);
          res.push({
            kind: "category",
            name: parsed[0],
            optional: parsed[1],
            selectables: el.selectables,
            data: el.data,
          });
        }
      }
    }
    return res;
  }

  parseOptionalCategory(category: string): [string, boolean] {
    if(category.includes("<", 0)){
      return [category.substring(1, category.length), true];
    } else {
      return [category, false];
    }
  }

  splitCategory(category: M.Category, splitLength: number){
    // let n_categories = Math.ceil(category.selectables.length / splitLength);
    let res: M.Category[] = [];

    for(let i=0, j=category.selectables.length; i<j; i+=splitLength){
      let name: string;
      if(i === 0){
        name = category.name
      } else {
        name = "";
      }
      let temp_sels: M.Selectable[] = [];
      temp_sels = category.selectables.slice(i, i+splitLength);
      res.push({
        kind: "category",
        name: name,
        selectables: temp_sels,
        data: category.data,
      });
    }

    return res;
  }

  // TODO
  extractKeywords(parts: M.Category[]) {
    for (const part of parts){
      for (const keyword of part.data.bau){
        this.keywords.push(keyword);
      }
    }
  }

  makeText(parts: M.TopLevel[]) {
    const [suppressedNormal, suppressedJudgement] = G.getSuppressedConditionalIds(parts);
    const normalExtractor: M.TextExtractor = G.normalExtractor();
    const judgementExtractor: M.TextExtractor = G.judgementExtractor();

    let report = G.makeText(parts, normalExtractor, suppressedNormal);
    let judgement = G.makeText(parts, judgementExtractor, suppressedJudgement);

    return [report, judgement];
  }

// parseLayout1_old(parts: M.TopLevel[]): M.Category[] {
//   const res = [];
//   let currentBlock: M.Block = null;
//   let currentEnum: M.Enumeration = null;
//   for(const el of this.parts) {
//     if (el.kind === "block") {
//       currentBlock = el;
//     } else if (el.kind === "enumeration"){
//       currentEnum = el;
//     } else if (el.kind === "category"){
//       const parsed = this.parseOptionalCategory(el.name);
//       res.push({
//         kind: "category",
//         name: parsed[0],
//         optional: parsed[1],
//         block: currentBlock,
//         enum: currentEnum,
//         selectables: el.selectables,
//         data: el.data,
//       });
//       currentBlock = null;
//       currentEnum = null;
//     } else {
//       console.log(el);
//       window.alert("Error during parsing of parts: unknown kind");
//     }
//   }
//   // this.extractKeywords(parts);
//   return res;
// }

}
