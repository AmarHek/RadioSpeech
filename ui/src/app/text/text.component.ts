import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as M from '../model'
import * as G from '../generator'
import * as P from '../parser'
import * as T from '../takers'

declare const $: any;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  text: string = "";
  judgement: string = "";
  modalVariables: M.Variable[] = [];

  parts: M.TopLevel[] = [];

  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient, private route: ActivatedRoute) {
    route.paramMap.subscribe(ps => {
      if (ps.get('name')) {
        http.post(environment.urlRoot + 'get', JSON.stringify(ps.get('name'))).subscribe(
          worked => {
            this.parts = worked as any
            const s = "\nSM-Aggregat re. pektoral, 2 konnektierte Sondenkabel in Projektion auf rechtes Atrium, Epikardium endend. "
            const box = (this.parts[5] as any).selectables[2];
            const taker = P.boxTaker(box, this.parts);
            console.log(taker(s));
            console.log(T.compound([T.text("abc"), T.optional(T.text(", "))])("abc, "));
          },
          error => window.alert("An unknown error occured: " + JSON.stringify(error))
        );
      }
    });
  }

  makeText(): void {
    const [suppressedNormal, suppressedJudgement] = G.getSuppressedConditionalIds(this.parts);
    const normalExtractor: M.TextExtractor = G.normalExtractor()
    const judgementExtractor: M.TextExtractor = G.judgementExtractor();

    this.text = G.makeText(this.parts, normalExtractor, suppressedNormal);
    this.judgement = G.makeText(this.parts, judgementExtractor, suppressedJudgement);
  }

  copyText(id: string): void {
    (document.getElementById(id) as HTMLInputElement).select();
    document.execCommand('copy');
  }

  makeNormal(): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        G.makeNormalCategory(p);
      }
    }
    this.makeText();
  }

  clicked(clicked: M.Clickable, parent?: M.Group): void {
    if (clicked.kind === "box" && clicked.variables.length > 0 && !clicked.value) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    } else if (clicked.kind === "option" && clicked.variables.length > 0 && parent && parent.value !== clicked.name) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    }
    setTimeout(() => this.makeText(), 0);
  }

  endVariableSelection(): void {
    this.makeText();
  }

  saveDialog(): void {
    localStorage.setItem("emptyDialog", JSON.stringify(JSON.parse(this.text)));
    this.parts = JSON.parse(this.text);
    this.text = "";
  }

  reverse(): void {
    const text = (document.getElementById('output1') as HTMLTextAreaElement).value;
    P.take(text, this.parts);
  }

}

