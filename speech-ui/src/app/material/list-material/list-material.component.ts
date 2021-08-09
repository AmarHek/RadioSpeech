import { Component, OnInit } from "@angular/core";
import {Material} from "../../../helper-classes/materialModel";
import {BackendCallerService} from "../../services/backend-caller.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-display-material",
  templateUrl: "./list-material.component.html",
  styleUrls: ["./list-material.component.scss"]
})
export class ListMaterialComponent implements OnInit {

  constructor(private backendCaller: BackendCallerService,
              private router: Router) { }

  serverUrl = environment.server;
  materials: Material[] = [];
  query: Object;

  ngOnInit(): void {
    this.query = {
      judged: false
    }
    this.getData();
  }

  getData() {
    this.backendCaller.queryMaterials(this.query).subscribe((mats: Material[]) => {
      this.materials = mats;
    });
  }

  changeQuery(newValue: boolean) {
    this.query = {
      judged: newValue
    }
    this.getData();
  }

  displayModality(modality: string) {
    if (modality === "xray") {
      return "CR";
    }
  }

  openEditor(matID: string) {
    this.router.navigate(['/', 'judgeMat', matID]).then();
  }

}
