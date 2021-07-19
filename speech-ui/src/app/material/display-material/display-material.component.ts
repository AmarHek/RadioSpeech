import { Component, OnInit } from "@angular/core";
import {MaterialManagerService} from "../../services/material-manager.service";
import {Material} from "../../../helper-classes/materialModel";
import {map} from "rxjs/operators";
import {arrayBufferToBase64} from "../../../helper-classes/util";

@Component({
  selector: "app-display-material",
  templateUrl: "./display-material.component.html",
  styleUrls: ["./display-material.component.scss"]
})
export class DisplayMaterialComponent implements OnInit {

  constructor(private materialManager: MaterialManagerService) { }

  materials: Material[] = [];

  ngOnInit(): void {
    this.materialManager.getMaterialsToJudge();
    this.materialManager.getMaterialUpdateListener().subscribe((mats: Material[]) => {
      this.materials = mats;
      for (let material of this.materials) {
        console.log(material.mainScan.data);
        console.log(this.convertBuffer(material.mainScan.data));
      }
    });
  }

  convertBuffer(buffer) {
    return arrayBufferToBase64(buffer);
  }




}