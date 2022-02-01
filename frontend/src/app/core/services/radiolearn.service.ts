import { Injectable } from "@angular/core";
import {
  BoundingBox,
  Category, Group, Option,
  Selectable,
  Template,
  Variable,
  VariableMC, VariableNumber, VariableOC,
  VariableRatio, VariableText
} from "@app/models";
import {
  CategoryError,
  SelectableError,
  VariableError,
  VariableMCError, VariableRatioError, VariableValueError
} from "@app/models/errorModel";

@Injectable({
  providedIn: "root"
})
export class RadiolearnService {

  currentPathology = "";
  colorBlindMode = false;

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

  compareTemplates(originalTemplate: Template, studentTemplate: Template, templateType: string = "XRay", ): CategoryError[] {
    if (templateType === "XRay") {
      return this.compareTemplatesXRay(originalTemplate, studentTemplate);
    }
  }

  compareTemplatesXRay(originalTemplate: Template, studentTemplate: Template): CategoryError[] {
    const errors = [];

    // check if templates have same length
    if (originalTemplate.parts.length !== studentTemplate.parts.length) {
      // For debugging purposes
      console.error("Length of parts is not the same. Please check your methods.");
      return [];
    }

    // iterate through categories
    for (let i = 0; i < originalTemplate.parts.length; i++) {
      if (originalTemplate.parts[i].kind === "category") {
        const originalCategory: Category = originalTemplate.parts[i] as Category;
        const studentCategory: Category = studentTemplate.parts[i] as Category;

        // first check the three special cases and push accordingly (the sub-methods do all required checks themselves)
        if (originalCategory.name === "PE") {
          const peError = this.comparePE(originalCategory, studentCategory);
          if (peError !== undefined) {
            errors.push(peError);
          }
        } else if (originalCategory.name === "Instrumentierung") {
          const instError = this.compareInstrumentation(originalCategory, studentCategory);
          if (instError !== undefined) {
            errors.push(instError);
          }
        } else if (originalCategory.name === "Weichteile") {
          const wtErrors = this.compareInstrumentation(originalCategory, studentCategory);
          if (wtErrors !== undefined) {
            errors.push(wtErrors);
          }
        } else {
          // get category errors and only push if at least one error is found
          const catError = this.compareCategories(originalTemplate.parts[i] as Category,
            studentTemplate.parts[i] as Category);
          if (catError.selErrors.length > 0) {
            errors.push(catError);
          } else if (catError.name === "ExceptionDummy") { // This is for debugging
            console.error("Something went wrong on OG " + (originalTemplate.parts[i] as Category).name + " and Stud " +
              (studentTemplate.parts[i] as Category).name);
          }
        }
      }
    }
    return errors;
  }

  compareCategories(originalCategory: Category, studentCategory: Category): CategoryError {
    // If categories are not the same, something went wrong before and an exception dummy is returned for error handling
    if (originalCategory.selectables.length !== studentCategory.selectables.length ||
      originalCategory.name !== studentCategory.name) {
      // Debugging
      console.error("Different categories!");
      return {
        name: "ExceptionDummy",
        selErrors: []
      };
    }

    // Generate empty category error
    const catError = {
      name: studentCategory.name,
      selErrors: []
    };

    // Iterate through selectables (each category has at least one selectable)
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
      if (selError !== undefined) {
        catError.selErrors.push(selError);
      }
    }

    return catError;
  }

  compareSelectable(originalSel: Selectable, studentSel: Selectable): SelectableError {
    let selError;
    if (originalSel.kind === "box" && studentSel.kind === "box") {
      // for box just get variable error and add should and actual values
      // it's okay if should and actual are the same, check for actual error happens in higher level
      const varErr = this.compareVariables(originalSel.variables, studentSel.variables);
      selError = {
        kind: "box",
        name: originalSel.name,
        should: originalSel.value,
        actual: studentSel.value,
        normal: studentSel.normal,
        varErrors: varErr
      };
    } else if (originalSel.kind === "group" && studentSel.kind === "group") {
      // Variable error is only necessary for correct option (because comparison of variables between options makes no sense)
      // If original option is null, variable error is empty (for obvious reasons)
      let varErr: VariableError[] = [];
      if (originalSel.value !== null) {
        // find variables of corresponding option in option list
        const originalVars: Variable[] = originalSel.options.find(option => option.name === originalSel.value).variables;
        const studentVars: Variable[] = studentSel.options.find(option => option.name === originalSel.value).variables;
        // get variable errors
        varErr = this.compareVariables(originalVars, studentVars);
      }
      // generate selectable error
      selError = {
        kind: "group",
        name: originalSel.name,
        should: (originalSel.value !== null ? originalSel.value : "Nichts"),
        actual: (studentSel.value !== null ? studentSel.value : "Nichts"),
        normal: this.getGroupNormal(studentSel),
        varErrors: varErr
      };
    } else {
      // Debugging stuff
      console.error("Selectable kind is not the same!");
    }

    // return error, if there is one, otherwise return undefined
    if ((selError.should !== selError.actual) || (selError.varErrors.length > 0)) {
      return selError;
    } else {
      return undefined;
    }
  }

  compareVariables(originalVars: Variable[], studentVars: Variable[]): VariableError[] {
    const varErr: VariableError[] = [];

    if (originalVars === undefined || studentVars === undefined || (originalVars.length !== studentVars.length)) {
      console.error("One or more function parameters are problematic!");
    } else {
      // iterate through variables
      for (let i = 0; i < originalVars.length; i++) {
        // get variables with proper type
        let err: VariableError;
        const shouldVar = originalVars[i];
        const actualVar = studentVars[i];
        // differentiate variable types
        if (shouldVar.kind === "mc") {
          err = this.compareVariableMC(shouldVar as VariableMC, actualVar as VariableMC);
        } else if (shouldVar.kind === "ratio") {
          err = this.compareVariableRatio(shouldVar as VariableRatio, actualVar as VariableRatio);
        } else if (shouldVar.kind === "oc") {
          err = this.compareVariableOC(shouldVar as VariableOC, actualVar as VariableOC);
        } else if (shouldVar.kind === "text") {
          err = this.compareVariableValue(shouldVar as VariableText, actualVar as VariableText);
        } else {
          err = this.compareVariableValue(shouldVar as VariableNumber, actualVar as VariableNumber);
        }

        if (err !== undefined) {
          varErr.push(err);
        }
      }
    }
    return varErr;
  }

  compareVariableMC(originalVar: VariableMC, studentVar: VariableMC): VariableMCError {
    const shouldValues = originalVar.values;
    const actualValues = studentVar.values;
    const should: string[] = [];
    const actual: string[] = [];
    // check if arrays are different and only iterate, if they are:
    if (shouldValues !== actualValues) {
      for (let j = 0; j < shouldValues.length; j++) {
        // only add "true" selections to should and actual
        if (shouldValues[j][1]) {
          should.push(shouldValues[j][0]);
        }
        if (actualValues[j][1]) {
          actual.push(actualValues[j][0]);
        }
      }
    }
    if (should !== actual && should.length > 0 && actual.length > 0) {
      return {
        id: originalVar.id,
        kind: "mc",
        should,
        actual
      };
    } else {
      return undefined;
    }
  }

  compareVariableRatio(originalVar: VariableRatio, studentVar: VariableRatio): VariableRatioError {
    if (originalVar.numerator !== studentVar.numerator || originalVar.denominator !== studentVar.denominator) {
      return {
        id: originalVar.id,
        kind: "ratio",
        shouldNum: originalVar.numerator,
        shouldDenom: originalVar.denominator,
        actualNum: studentVar.numerator,
        actualDenom: studentVar.denominator
      };
    } else {
      return undefined;
    }
  }

  compareVariableOC(originalVar: VariableOC, studentVar: VariableOC): VariableValueError {
    if (originalVar.value !== studentVar.value) {
      return {
        id: originalVar.id,
        kind: "value",
        should: (originalVar.value !== null ? originalVar.value : "Nichts"),
        actual: (studentVar.value !== null ? studentVar.value : "Nichts")
      };
    } else {
      return undefined;
    }
  }

  compareVariableValue(originalVar: VariableText | VariableNumber,
                       studentVar: VariableText | VariableNumber): VariableValueError {
    if (originalVar.value !== studentVar.value) {
      return {
        id: originalVar.id,
        kind: "value",
        should: originalVar.value,
        actual: studentVar.value
      };
    } else {
      return undefined;
    }
  }


  // special cases for PE, Instrumentierung and Weichteile because of multiple choice cases

  comparePE(originalCat: Category, studentCat: Category): CategoryError {
    // Mehrere Fälle durchgehen:
    // 1. Fall: Lösung sagt kein PE, dann normal durchiterieren und alles, was nicht 'kein PE' ist, als falsch werten
    //  (der Text für Lösung ist dabei immer kein PE)
    // 2. Fall: Durchgehen, welche Auswahlmöglichkeiten stimmen und sammeln
    //  Gleiches für Studentenauswahl
    //  Dann abgleichen: gleiche Auswahlen werden präferiert, ansonsten z.B. O gering - S deutlich machen
    //  und die entsprechenden Variablen prüfen (also Variablen von O gering mit denen von S deutlich vergleichen)
    return;
  }

  compareInstrumentation(originalCat: Category, studentCat: Category): CategoryError {
    // Bei der Instrumentierung sind nur die Doppel- und Dreifachfälle speziell zu behandeln, i.e. ZVK, 2. ZVK
    // 1., 2., 3. Pleuradrainage etc.
    // Die restlichen Selectables können wie gehabt geprüft werden
    return;
  }

  compareWT(originalCat: Category, studentCat: Category): CategoryError {
    // Hier vereinfachte Form von Instrumentierung wegen WT-Emphysem

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < originalCat.selectables.length; i++) {
      return;
    }
  }

  getGroupNormal(group: Group) {
    // checks the options of a group and returns that option's normal value
    for (const option of group.options) {
      if (group.value === option.name) {
        return option.normal;
      }
    }
    // if no normal value is given, return false by default
    return false;
  }

}
