import { Injectable } from "@angular/core";
import * as M from "../models/templateModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Observable} from "rxjs";
import {Template} from "../models/templateModel";
import {Material} from "../models/materialModel";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the list of templates and executes all api calls
// -----------------------------------

export class BackendCallerService {

  templateUrl = environment.server + environment.database + environment.template;
  materialUrl = environment.server + environment.database + environment.material;


  constructor(private http: HttpClient) {}

  getTemplateById(id: string): Observable<Template> {
      return this.http.get<Template>(this.templateUrl + id);
  }

  // TEMPLATE API

  addTemplate(template: M.Template): Observable<{ message: string; templateId: string }> {
    return this.http.post<{ message: string; templateId: string }>(
      this.templateUrl,
      template
    );
  }

  addTemplateFromJSON(jsonData: FormData): Observable<{message: string; templateId: string }> {
    return this.http.post<{message: string, templateId: string }>(
      this.templateUrl + "json/",
      jsonData
    );
  }

  /*
addTemplateFromExcel(postData: FormData) {
  this.http
    .post<{ message: string; templateId: string }>(
      this.activeUrl + "excel",
      postData
    )
    .subscribe((res) => {
      let str = "";
      if (res.templateId === "false") {
        str =
          "Fehler beim Hochladen der Excel Datei. Die Tabelle wurde nicht korrekt befüllt. \n Folgender Fehler ist aufgetreten: \n\n";
      }
      window.alert(str + res.message);
    });
}*/

  deleteTemplate(id: string): Observable<Object> {
    return this.http.delete(this.templateUrl + id);
  }

  updateTemplate(template: M.Template) {
    return this.http
      .put(this.templateUrl + template._id, {
        parts: template.parts,
        name: template.name,
      });
  }

  getTemplateList(): Observable<Template[]> {
    return this.http.get<Template[]>(this.templateUrl);
  }

  // MATERIAL API

  addMaterial(formData: FormData): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      this.materialUrl,
      formData
    );
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(this.materialUrl + id);
  }

  deleteMaterial(id: string) {
    return this.http.delete(this.materialUrl + id);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(
      this.materialUrl + "sample/"
    );
  }

  queryMaterials(query: Record<string, unknown>): Observable<Material[]> {
    return this.http.post<Material[]>(
      this.materialUrl + "query/",
      query
    );
  }

  updateMaterial(material: Material) {
    return this.http.put<{message: string}>(this.materialUrl + material._id, {
      parts: material.parts,
      coordinates: material.coordinates,
      judged: true
    });
  }

}


