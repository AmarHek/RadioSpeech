import { Component, OnInit } from '@angular/core';
import * as M from "../../../helper-classes/templateModel";
import {Material} from "../../../helper-classes/materialModel";
import {BackendCallerService} from "../../services/backend-caller.service";
import {ActivatedRoute} from "@angular/router";
import {DataParserService} from "../../services/dataParser.service";

@Component({
  selector: 'app-judge-mat',
  templateUrl: './judge-mat.component.html',
  styleUrls: ['./judge-mat.component.scss']
})
export class JudgeMatComponent implements OnInit {

  material: Material;
  categories: M.Category[];
  report = "";
  judgement = "";

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private dataParser: DataParserService) { }

  ngOnInit(): void {
    this.getData();
    this.openImageInWindow();
  }

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("id")) {
        const matID = ps.get("id");
        this.backendCaller.getMaterialById(matID).subscribe((material: Material) => {
          if (material === undefined) {
            window.alert("Der Eintrag mit dieser ID existiert nicht! " +
              "Bitte zur Aufnahmenliste zurückkehren und eines der dort aufgeführten Aufnahmen auswählen.");
          } else {
            this.material = material;
            this.categories = this.dataParser.extractCategories(this.material.parts, false);
          }
        });
      }
    });
  }

  updateText(): void {
    [this.report, this.judgement] = this.dataParser.makeText(this.material.parts);
  }

  resetText(): void {
    this.report = "";
    this.judgement = "";
  }

  onClick() {
    setTimeout(() => this.updateText(), 1);
  }

  makeNormal() {
    this.dataParser.makeNormal(this.material.parts);
    this.updateText();
  }

  openImageInWindow() {

  }

  submit() {
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
    });
  }

}
