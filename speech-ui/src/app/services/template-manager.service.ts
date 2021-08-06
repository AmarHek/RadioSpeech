import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/templateModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Template} from "../../helper-classes/templateModel";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the list of templates and executes all api calls
// -----------------------------------

// TODO: Refactor this and material-manager to be more general --> specific mappings etc. go to the actual components

export class TemplateManager {

  activeUrl = environment.urlRootMongo;

  constructor(private http: HttpClient) {
    this.getList();
  }

  getList(): Observable<Template[]> {
    return this.http.get<Template[]>(this.activeUrl);
  }

  getTemplate(id: string) {
    return this.http.get(this.activeUrl + id);
  }

  remove(id: string): Observable<Object> {
    return this.http.delete(this.activeUrl + id);
  }

  addTemplate(template: M.Template): Observable<Object> {
    return this.http.post<{ message: string; templateId: string }>(
        this.activeUrl,
        template
      );
  }

  addJSON(jsonData: FormData): Observable<Object> {
    return this.http.post<{message: string, templateId: string }>(
      this.activeUrl + "json",
      jsonData
    );
  }

  updateTemplate(template: M.Template): Observable<any> {
    return this.http
      .put(this.activeUrl + template._id, {
        parts: template.parts,
        name: template.name,
      });
  }

  /*
  addExcel(postData: FormData) {
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


}


