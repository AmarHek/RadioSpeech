import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TimeStampsService } from '../time-stamps.service';
import {DataParserService} from "../dataParser.service";
import {DisplayService} from "../display.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  generators: string[] = [];
  myArr: string[] = [];
  layout: string;

  constructor(private http: HttpClient,
              private dataParser: DataParserService,
              private timesService: TimeStampsService,
              private display: DisplayService) { }

  ngOnInit() {
    this.updateList();
    this.layout = this.display.getCurrentLayout();
  }

  remove(generator: string, index: number): void {
    this.http.post(environment.urlRoot + 'remove', JSON.stringify(generator)).subscribe(
      result => { this.updateList() },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }

  updateList(): void {
    this.http.post(environment.urlRoot + 'list', '').subscribe(
      result => {
                  this.generators = result as any;
                   },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }

  // getTopLevel(generator) {
  //   this.http.post(environment.urlRoot + "get", JSON.stringify(generator)).subscribe(
  //     worked => {
  //       this.dataParser.rawParts = worked as any;
  //       },
  //     error => window.alert("An unknown error occurred: " + JSON.stringify(error))
  //   );
  // }


}
