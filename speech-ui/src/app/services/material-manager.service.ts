import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/materialModel";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { map } from "rxjs/operators";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MaterialManagerService {
  activeUrl = environment.urlRootMongo + "material";
  materials: M.Material[] = [];
  private materialsUpdated = new Subject<M.Material[]>();

  constructor(private http: HttpClient) { }

  getMaterials() {
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

  getMaterialsToJudge() {
    this.http.get<{message: string; materials: any }>(
      this.activeUrl + "/query"
    ).pipe(
      map((getter) => {
        return getter.materials.map((mat) => {
          return {
            id: mat._id,
            mainScan: mat.mainScan,
            lateralScan: mat.lateralScan,
            preScan: mat.preScan,
            coordinates: mat.coordinates,
            modality: mat.modality,
            parts: mat.parts,
            pathologies: mat.pathologies,
            judged: mat.judged
          };
        });
      })
    ).subscribe((transData) => {
      this.materials = transData;
      this.materialsUpdated.next([...this.materials]);
    });
  }

  getMaterialUpdateListener() {
    return this.materialsUpdated;
  }

  addMaterial(formData: FormData): Observable<{ messsage: string }> {
    return this.http.post<{ messsage: string }>(
        this.activeUrl,
        formData
      );
  }

  deleteMaterial(id: string): void {
    this.http.delete(this.activeUrl + id)
      .subscribe(() => {
        this.materials = this.materials.filter((material) => material.id !== id);
      });
  }
}
