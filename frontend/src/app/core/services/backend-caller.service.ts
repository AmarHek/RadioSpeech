import { Injectable } from "@angular/core";
import * as M from "../../models/templateModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import {Observable} from "rxjs";
import {Template, Material, Feedback} from "@app/models";


@Injectable({
  providedIn: "root",
})

// -----------------------------------
// This class administrates the template-list of templates and executes all api calls
// -----------------------------------

export class BackendCallerService {

  templateUrl = environment.database + "template/";
  materialUrl = environment.database + "material/";
  usageUrl = environment.database + "usage/";
  feedbackUrl = environment.database + "feedback/";

  constructor(private http: HttpClient) {}

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

  addTemplateFromJSON(jsonData: FormData): Observable<{message: string; templateId: string }> {
    return this.http.post<{message: string; templateId: string }>(
      this.templateUrl + "json/",
      jsonData
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

  getTemplatesByKind(kind: string) {
    return this.http.post<{templates: Template[]; message: string}>(
        this.templateUrl + "getByKind/",
        {kind}
    );
  }

  getTemplateByName(name: string) {
    return this.http.post<{template: Template; message: string}>(
      this.templateUrl + "getByName/",
      {name}
    );
  }

  // MATERIAL API

  addMaterial(formData: FormData): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      this.materialUrl + "add/",
      formData
    );
  }

  addUsageData(UUID: string, materialID: string, deepDocTemplate: Template, shallowDocTemplate: Template,
               mode: string, timestampStart: number, duration: number, ogMaterial: Material): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      this.usageUrl + "add/",{UUID, materialID, deepDocTemplate, shallowDocTemplate, mode, timestampStart, duration, ogMaterial}
    );
  }

  updateMaterial(material: Material) {
    return this.http.put<{message: string}>(this.materialUrl + "update/" + material._id, {
      deepDocTemplate: material.deepDocTemplate,
      shallowDocTemplate: material.shallowDocTemplate,
      annotations: material.annotations,
      judged: true
    });
  }

  addScan(id: string, formData: FormData) {
    return this.http.post<{ message: string }>(
      this.materialUrl + "addScan/" + id,
      formData
    );
  }

  deleteMaterial(objectID: string, scanID: string): Observable<{ message: string }> {
    return this.http.post<{message: string}>(this.materialUrl + "delete/",
      {objectID, scanID});
  }

  getMaterialById(id: string) {
    return this.http.get<{message: string; material: Material}>(this.materialUrl + "get/" + id);
  }

  deleteScanById(objectID: string, scanID: string, scanType: string, filename: string) {
    return this.http.post<{message: string}>(this.materialUrl + "deleteScanByID/" + objectID,
      {id: scanID, scanType, filename});
  }

  listByQuery(skip: number, length: number, judged: boolean) {
    const query = {skip, length, judged};
    // skip: mongoose skip parameter, how many documents to skip
    // length: how many documents to return
    return this.http.post<{message: string; materials: Material[]}>(
      this.materialUrl + "listByQuery/",
      query);
  }

  getRandom(judged: boolean) {
    return this.http.post<{message: string; material: Material}>(
      this.materialUrl + "random/",
      {judged}
    );
  }

  getUnusedMaterial(UUID: string, mode: string){
    return this.http.post<{message: string; material: Material}>(
      this.materialUrl + "unused/",
      {UUID, mode}
    );
  }

  getDocCount(judged: boolean) {
    return this.http.post<{message: string; count: number}>(
      this.materialUrl + "queryDocCount/",
      {judged}
    );
  }

  updateMatTemplate(judged: boolean) {
    return this.http.put<{message: string}>(this.materialUrl + "updateMaterialTemplates/", {judged});
  }

  updateMatTemplateBC() {
    return this.http.put<{message: string}>(this.materialUrl + "updateMaterialTemplatesBC/", {});
  }

  updateMatTemplateBCByID(id: string) {
    return this.http.put<{message: string}>(this.materialUrl + "updateMaterialTemplatesBCByID/" + id, {});
  }

  // FEEDBACK API

  getFeedbackList(skip: number, length: number) {
    return this.http.post<{message: string; feedbackList: Feedback[]}>(
      this.feedbackUrl + "list/",
      {skip, length}
    );
  }

  getFeedbackCount() {
    return this.http.get<{message: string; count: number}>(
      this.feedbackUrl + "count/"
    );
  }

  addFeedback(feedback: Feedback) {
    return this.http.post<{message: string; id: string}>(
      this.feedbackUrl + "add/",
      feedback);
  }

  deleteFeedback(id: string) {
    return this.http.delete(this.feedbackUrl + "delete/" + id);
  }

}


