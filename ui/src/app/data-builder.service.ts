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

  // startingTime: Date;
  // parts: M.TopLevel[];

  generateDataDict(rootEl: M.TopLevel[]) {
    let example = "Thorax pa kein PE PE rechts gering Mediastinum normal Aorta elongiert";
    P.take(example, rootEl);
    //for (const El of rootEl) {
    //  console.log(El);
    //}
  }

}
