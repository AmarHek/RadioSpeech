import { Injectable } from "@angular/core";
import {BoundingBox, Template, Variable} from "@app/models";

@Injectable({
  providedIn: "root"
})
export class RadiolearnService {

  currentPathology = "";

  constructor() { }

  checkBoxes(coordinates: Record<string, BoundingBox[]>): string {
    const res: string[] = [];
    if (coordinates.main.length > 0) {
      res.push("Hauptaufnahme");
    }
    if (coordinates.lateral.length > 0) {
      res.push("Lateralaufnahme");
    }
    if (coordinates.pre.length > 0) {
      res.push("Voraufnahme");
    }

    if (res.length > 0) {
      return res.join(", ");
    } else {
      return "Keiner Aufnahme";
    }
  }

  resetTemplate(template: Template) {
    for (const el of template.parts) {
      if (el.kind === "category") {
        for (const sel of el.selectables) {
          if (sel.kind === "group") {
            sel.value = null;
            for (const option of sel.options) {
              if (option.variables.length > 0) {
                option.variables = this.resetVariable(option.variables);
              }
            }
          } else if (sel.kind === "box") {
            sel.value = false;
            if (sel.variables.length > 0) {
              sel.variables = this.resetVariable(sel.variables);
            }
          }
        }
      }
    }
    return template;
  }

  resetVariable(variables: Variable[]): Variable[] {
    for (const variable of variables) {
      if (variable.kind === "oc") {
        variable.value = null;
      } else if (variable.kind === "mc") {
        for (const val of variable.values) {
          val[1] = false;
        }
      } else if (variable.kind === "ratio") {
        variable.numerator = 0;
        variable.denominator = 0;
      } else if (variable.kind === "number") {
        variable.value = 0;
      } else if (variable.kind === "text") {
        variable.value = "";
      }
    }
    return variables;
  }

  compareTemplates(originalTemplate: Template, studentTemplate: Template) {
    return;
  }

}

