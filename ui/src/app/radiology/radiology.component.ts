import {Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';

import { environment } from '../../environments/environment';
import * as M from '../../helper-classes/model';
import * as G from '../../helper-classes/generator';
import {DataParserService} from '../services/dataParser.service';
import {OptionsComponent} from '../options/options.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.scss'],
})

export class RadiologyComponent implements OnInit {

  parts: M.TopLevel[];
  defaultParts: M.TopLevel[];

  categories: M.Category[];
  report = '';
  judgement = '';

  @ViewChild(OptionsComponent)
  private optionsComponent: OptionsComponent;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.get('name')) {
        this.http.post(environment.urlRootRadio + 'get', JSON.stringify(ps.get('name'))).subscribe(
          worked => {
            this.parts = worked as any;
            this.defaultParts = JSON.parse(JSON.stringify(worked));
            this.categories = this.dataParser.extractCategories(this.parts);
          },
          error => window.alert('An unknown error occurred: ' + JSON.stringify(error))
        );
      }
    });
  }

  updateText(): void {
    [this.report, this.judgement] = this.dataParser.makeText(this.parts);
  }

  resetText(): void {
    this.report = '';
    this.judgement = '';
  }

  onClick() {
    setTimeout(() => this.updateText(), 1);
  }

  onInput(ev) {
    console.log('event');
    console.log(ev);
    const inp = (document.getElementById('input') as HTMLTextAreaElement).value;
    const dif = '';
    console.log('inp', inp);
    console.log('dif', dif);
  }

  makeNormal() {
    for (const p of this.parts) {
      if (p.kind === 'category') {
        G.makeNormalCategory(p);
      }
    }
    this.updateText();
  }

  reset() {
    this.parts = JSON.parse(JSON.stringify(this.defaultParts));
    this.categories = this.dataParser.extractCategories(this.parts);
    setTimeout(() => this.optionsComponent.initRows(), 5);
    setTimeout(() => this.resetText(), 5);
  }

  refreshPage() {
    window.location.reload();
  }

  pageBack() {
    this._location.back();
  }

  test() {
    console.log(this.parts);
    console.log(this.optionsComponent.rows);
  }

}
