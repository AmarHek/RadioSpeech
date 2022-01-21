import { Injectable } from "@angular/core";
import {BoundingBox, Category, CheckBox, Group, Selectable, Template, Variable} from "@app/models";
import {CategoryError, CheckboxError, GroupError, SelectableError, VariableError} from "@app/models/errorModel";

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

  compareTemplates(originalTemplate: Template, studentTemplate: Template): CategoryError[] {
    const errors = [];

    // check if templates have same length
    if (originalTemplate.parts.length !== studentTemplate.parts.length) {
      // TODO Exception handling here? Maybe on higher level
      return [];
    }

    // iterate through categories
    for (let i = 0; i < originalTemplate.parts.length; i++) {
      if (originalTemplate.parts[i].kind === "category") {
        // get category errors and only push if at least one error is found
        const catError = this.compareCategories(originalTemplate.parts[i] as Category,
          studentTemplate.parts[i] as Category);
        if (catError.errors.length > 0) {
          errors.push(catError);
        } else if (catError.name === "ExceptionDummy") {
          console.error("Something went wrong on OG " + (originalTemplate.parts[i] as Category).name + " and Stud " +
            (studentTemplate.parts[i] as Category).name);
        }
      }
    }

    return errors;
  }

  compareCategories(originalCategory: Category, studentCategory: Category): CategoryError {
    // If categories are not the same, something went wrong before and an exception dummy is returned for error handling
    if (originalCategory.selectables.length !== studentCategory.selectables.length ||
      originalCategory.name !== studentCategory.name) {
      console.error("Different categories!");
      return {
        name: "ExceptionDummy",
        errors: []
      };
    }

    const catError = {
      name: studentCategory.name,
      errors: []
    };

    for (let i = 0; i < originalCategory.selectables.length; i++) {
      let selError: SelectableError;
      // Check if names are the same, otherwise error
      if (originalCategory.selectables[i].name === studentCategory.selectables[i].name) {
        selError = this.compareSelectable(originalCategory.selectables[i],
          studentCategory.selectables[i]);
      } else {
        console.error("Something went wrong on " + originalCategory.selectables[i].name + " and " +
        studentCategory.selectables[i].name + ", skipping");
        continue;
      }
      // Only add error, if should and actual are different or if there are variable errors
      if ((selError.should !== selError.actual) || selError.varErr.length > 0) {
        catError.errors.push(selError);
      }
    }
    return catError;
  }

  compareSelectable(originalSel: Selectable, studentSel: Selectable): SelectableError {
    let selError;
    if (originalSel.kind === "box") {
      selError = {
        name: originalSel.name,
        should: originalSel.value,
        actual: studentSel.value,
        varErr: []
      };
    } else if (originalSel.kind === "group") {
      selError = {
        name: originalSel.name,
        should: originalSel.value !== null ? originalSel.value | "Nichts",
        actual: studentSel.value !== null ? studentSel.value | "Nichts",
        varErr: []
      }
    }

    const varErr = this.compareVariables(originalSel.variables, studentSel.variables);

    return selError;
  }

  compareVariables(originalVars: Variable[], studentVars: Variable[]): VariableError {
    return;
  }

}

