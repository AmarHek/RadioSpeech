import { Component, OnInit } from "@angular/core";
import {Material} from "../../../helper-classes/materialModel";
import {arrayBufferToBase64} from "../../../helper-classes/util";
import {BackendCallerService} from "../../services/backend-caller.service";

@Component({
  selector: "app-display-material",
  templateUrl: "./display-material.component.html",
  styleUrls: ["./display-material.component.scss"]
})
export class DisplayMaterialComponent implements OnInit {

  constructor(private backendCaller: BackendCallerService) { }

  public materials: Material[] = [];

  ngOnInit(): void {
    this.backendCaller.queryMaterials({judged: false}).subscribe((mats: Material[]) => {
      this.materials = mats;
      for ( let material of this.materials) {
        console.log(material.scans.id);
      }
    });
  }

}
