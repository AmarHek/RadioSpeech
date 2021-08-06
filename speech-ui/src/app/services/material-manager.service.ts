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
  dataUrl = environment.urlRootMongo + "material";
  materials: M.Material[] = [];
  private materialsUpdated = new Subject<M.Material[]>();

  constructor(private http: HttpClient) { }

  // TODO: Fuse this with template-manager (maybe) + fix hard-coded urls

  getMaterials() {
    return this.http.get<{message: string; materials: any }>(
      this.dataUrl
    )
  }

  getMaterialsToJudge() {
    return this.http.get<{message: string; materials: any }>(
      this.dataUrl + "/query"
    )
  }

  getMaterialUpdateListener() {
    return this.materialsUpdated;
  }

  addMaterial(formData: FormData): Observable<{ messsage: string }> {
    return this.http.post<{ messsage: string }>(
        this.dataUrl,
        formData
      );
  }

  deleteMaterial(id: string): Observable<Object> {
    return this.http.delete(this.dataUrl + id);
  }


}
