import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/templateModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Template} from "../../helper-classes/templateModel";
import {Material} from "../../helper-classes/materialModel";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the list of templates and executes all api calls
// -----------------------------------

// TODO: Refactor this and material-manager to be more general --> specific mappings etc. go to the actual components

export class BackendCallerService {

  rootUrl = environment.urlRootMongo;
  templateUrl = "template/"
  materialUrl = "material/"


  constructor(private http: HttpClient) {}

  // TEMPLATE API

  addTemplate(template: M.Template): Observable<Object> {
    return this.http.post<{ message: string; templateId: string }>(
      this.rootUrl + this.templateUrl,
      template
    );
  }

  addTemplateFromJSON(jsonData: FormData): Observable<Object> {
    return this.http.post<{message: string, templateId: string }>(
      this.rootUrl + this.templateUrl + "json",
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
    return this.http.delete(this.rootUrl + this.templateUrl + id);
  }

  updateTemplate(template: M.Template): Observable<any> {
    return this.http
      .put(this.rootUrl + this.templateUrl + template._id, {
        parts: template.parts,
        name: template.name,
      });
  }

  getTemplateList(): Observable<Template[]> {
    return this.http.get<Template[]>(this.rootUrl + this.templateUrl);
  }

  getTemplate(id: string) {
    return this.http.get(this.rootUrl + this.templateUrl + id);
  }

  // MATERIAL API

  addMaterial(formData: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.rootUrl + this.materialUrl,
      formData
    );
  }

  deleteMaterial(id: string): Observable<Object> {
    return this.http.delete(this.rootUrl + this.materialUrl + id);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(
      this.rootUrl + this.materialUrl + "sample"
    )
  }

  queryMaterials(query: Object): Observable<Material[]> {
    return this.http.post<Material[]>(
      this.rootUrl + this.materialUrl + "query",
      query
    )
  }

}


