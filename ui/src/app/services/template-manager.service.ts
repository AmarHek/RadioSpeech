import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the list of templates and executes all api calls
// -----------------------------------

export class TemplateManager {
  templates: Array<M.Template> = [];
  private listUpdated = new Subject<M.Template[]>();
  activeUrl = environment.urlRootMongo;

  constructor(private http: HttpClient) {
    this.getList();
  }

  getList() {
    this.http
      .get<{ message: string; templates: any }>(
        this.activeUrl
      )
      .pipe(
        map((getter) => {
          return getter.templates.map((retDict) => {
            return {
              id: retDict._id,
              name: retDict.name,
              parts: retDict.parts
            };
          });
        })
      )
      .subscribe((transData) => {
        this.templates = transData;
        this.listUpdated.next([...this.templates]);
        console.log(this.listUpdated);
        console.log(this.templates);
      });
  }

  getTemplate(name: string) {
    // this.http.post(this.activeUrl)
  }

  getListUpdateListener() {
    return this.listUpdated;
  }

  remove(id: string): void {
    this.http
      .delete(this.activeUrl + id)
      .subscribe(() => {
        this.templates = this.templates.filter((template) => template.id !== id);
        this.listUpdated.next([...this.templates]);
        // this.myList = update;
      });
    // this.timesService.removeTimeStamp(index);
  }

  addTemplate(template: M.Template) {
    this.http
      .post<{ message: string; templateId: string }>(
        this.activeUrl,
        template
      )
      .subscribe((response) => {
        template.id = response.templateId;
        this.templates.push(template);
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

  updateDict(template: M.Template) {
    this.http
      .put(this.activeUrl + template.id, {
        parts: template.parts,
        name: template.name,
      })
      .subscribe((response) => {
        this.templates[this.templates.findIndex((t) => t.id === template.id)] = template;
        this.listUpdated.next([...this.templates]);
      });
  }
}


