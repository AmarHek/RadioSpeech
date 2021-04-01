import { Injectable } from "@angular/core";
import {ParserBasisService} from "./parser-basis.service";
import * as M from "../../helper-classes/radio_model";
import {KeywordCategory, KeywordDisease, KeywordSelectable, TextDic} from "../../helper-classes/keyword";

@Injectable({
  providedIn: "root"
})
export class InputParserRadioService {

  categoryKeywords: KeywordSelectable[] = [];
  startingTime: Date;
  end = false;
  start = false;
  end0 = false;
  globalPos: number;

  constructor(private base: ParserBasisService) {
  }

  createStartDict(rootEl: M.TopLevel[]): KeywordCategory[] {
    for (const el of rootEl) {
      if (el.kind === "category") {
        let syns: string[];
        const keys: KeywordSelectable[] = [];
      }
    }
    return [];
  }


}
