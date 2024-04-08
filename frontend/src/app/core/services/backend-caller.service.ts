import {Injectable} from "@angular/core";
import * as M from "@app/core/models/templateModel";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {Observable} from "rxjs";
import {Template, Feedback} from "app/core/models";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the template-list of templates and executes all api calls
// -----------------------------------

export class BackendCallerService {

  templateUrl = environment.database + "template/";
  usageUrl = environment.database + "usage/";
  feedbackUrl = environment.database + "feedback/";

  constructor(private http: HttpClient) {
  }

  getTemplateById(id: string): Observable<Template> {
    return this.http.get<Template>(this.templateUrl + id);
  }

  // TEMPLATE API

  addTemplate(template: M.Template): Observable<{ message: string; templateId: string }> {
    return this.http.post<{ message: string; templateId: string }>(
      this.templateUrl + "add/",
      template
    );
  }

  addTemplateFromExcel(postData: FormData) {
    return this.http
      .post<{ message: string; templateId: string }>(
        this.templateUrl + "excel/",
        postData
      );
  }

  deleteTemplate(id: string) {
    return this.http.delete(this.templateUrl + "delete/" + id);
  }

  updateTemplate(template: M.Template) {
    return this.http
      .put(this.templateUrl + "update/" + template._id, {
        parts: template.parts,
        name: template.name,
      });
  }

  getTemplateList(): Observable<Template[]> {
    console.log(this.templateUrl);
    return this.http.get<Template[]>(this.templateUrl + "list/");
  }

  getTemplateListAsString(kind: "deepDoc" | "shallowDoc") {
    return this.http.post<{ templateNames: string[] }>(
      this.templateUrl + "listAsString/",
      {kind});
  }

  getTemplatesByKind(kind: string) {
    return this.http.post<{ templates: Template[]; message: string }>(
      this.templateUrl + "getByKind/",
      {kind}
    );
  }

  getTemplateByName(name: string) {
    return this.http.post<{ template: Template; message: string }>(
      this.templateUrl + "getByName/",
      {name}
    );
  }

  // USAGE API
  addDoctorReport(template: Template, timestampStart: number,
                  duration: number, imageID: string, layoutID: number,
                  mode: string, report: string, pseudonym: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      this.usageUrl + "addDoctorReport/", {
        template, timestampStart, duration,
        imageID, layoutID, mode, report, pseudonym
      }
    );
  }

  // FEEDBACK API
  getFeedbackList(skip: number, length: number) {
    return this.http.post<{ message: string; feedbackList: Feedback[] }>(
      this.feedbackUrl + "list/",
      {skip, length}
    );
  }

  getFeedbackCount() {
    return this.http.get<{ message: string; count: number }>(
      this.feedbackUrl + "count/"
    );
  }

  addFeedback(feedback: Feedback) {
    return this.http.post<{ message: string; id: string }>(
      this.feedbackUrl + "add/",
      feedback);
  }

  deleteFeedback(id: string) {
    return this.http.delete(this.feedbackUrl + "delete/" + id);
  }
}
