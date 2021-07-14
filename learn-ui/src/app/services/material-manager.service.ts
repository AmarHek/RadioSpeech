import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/materialModel";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MaterialManagerService {
  activeUrl = environment.urlRootMongo + "/material";
  materials: M.Material[] = [];

  constructor(private http: HttpClient) { }

  getList() {
    this.http.get<{message: string; materials: any }>(
      this.activeUrl
    ).pipe(
      map((getter) => {
        return getter.materials.map((mat) => {
          return {
            id: mat._id,
            img: mat.img,
            modality: mat.modality,
            parts: mat.parts,
            defaultParts: mat.defaultParts,
            pathologies: mat.pathologies
          };
        });
      })
    ).subscribe((transData) => {
      this.materials = transData;
    });
  }

  addMaterial(postData: FormData) {
    this.http.post<{ messsage: string}>(
      this.activeUrl,
      postData
    ).subscribe((response) => {
      window.alert(response.messsage);
    });
  }

  deleteMaterial(id: string): void {
    this.http.delete(this.activeUrl + id)
      .subscribe(() => {
        this.materials = this.materials.filter((material) => material.id !== id);
      });
  }
}
