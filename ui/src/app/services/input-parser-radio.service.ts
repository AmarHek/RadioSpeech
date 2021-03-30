import { Injectable } from "@angular/core";
import {ParserBasisService} from "./parser-basis.service";
import * as M from "../../helper-classes/model";
import {Category, Disease, Keyword, TextDic} from "../../helper-classes/keyword";

@Injectable({
  providedIn: "root"
})
export class InputParserRadioService {

  categoryKeywords: Keyword[] = [];
  startingTime: Date;

  constructor(private base: ParserBasisService) {
  }

  /*
  createStartDict(rootEl: M.TopLevel[]) {
    for (const el of rootEl) {
      if ( el.kind === "category" ) {
        let syns: string[];
        const keys: Keyword[] = [];
      }
    }
  }*/
}
