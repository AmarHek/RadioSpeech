import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/materialModel";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MaterialManagerService {
  activeUrl = environment.urlRootMongo + "material";
  materials: M.Material[] = [];

  constructor(private http: HttpClient) { }

  getMats() {
    this.http.get<{message: string; materials: any }>(
      this.activeUrl
    ).pipe(
      map((getter) => {
        return getter.materials.map((mat) => {
          return {
            id: mat._id,
            mainScan: mat.mainScan,
            lateralScan: mat.lateralScan,
            preScan: mat.preScan,
            modality: mat.modality,
            parts: mat.parts,
            pathologies: mat.pathologies,
            judged: mat.judged
          };
        });
      })
    ).subscribe((transData) => {
      this.materials = transData;
    });
  }

  async addMaterials(postData: FormData[]) {
    let message = "";
    for (const formData of postData) {
      await this.http.post<{ messsage: string }>(
        this.activeUrl,
        formData
      ).subscribe((response) => {
        message = response.messsage;
      });
    }
    window.alert(message);
  }

  deleteMaterial(id: string): void {
    this.http.delete(this.activeUrl + id)
      .subscribe(() => {
        this.materials = this.materials.filter((material) => material.id !== id);
      });
  }
}
