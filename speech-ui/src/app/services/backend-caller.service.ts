import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/templateModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Template} from "../../helper-classes/templateModel";
import {Material} from "../../helper-classes/materialModel";
import * as path from "path";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the list of templates and executes all api calls
// -----------------------------------

// TODO: Refactor this and material-manager to be more general --> specific mappings etc. go to the actual components

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

  addTemplateFromJSON(jsonData: FormData): Observable<{message: string, templateId: string }> {
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

  updateTemplate(template: M.Template): Observable<any> {
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

  addMaterial(formData: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.materialUrl,
      formData
    );
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(this.materialUrl + id);
  }

  deleteMaterial(id: string): Observable<Object> {
    return this.http.delete(this.materialUrl + id);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(
      this.materialUrl + "sample/"
    )
  }

  queryMaterials(query: Object): Observable<Material[]> {
    return this.http.post<Material[]>(
      this.materialUrl + "query/",
      query
    )
  }

}


