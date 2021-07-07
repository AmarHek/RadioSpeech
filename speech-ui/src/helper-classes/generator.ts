import * as M from "./model";

export function normalExtractor(): M.TextExtractor {
  return new class {
    ofCheckbox(c: M.CheckBox): string | undefined { return c.text; }
    ofOption(o: M.Option): string | undefined { return o.text; }
    ofEnumeration(e: M.Enumeration): string | undefined { return e.text; }
    ofBlock(b: M.Block): string | undefined { return b.text; }
    ofConditional(c: M.Conditional): string | undefined { return c.normalText; }
  };
}

export function judgementExtractor(): M.TextExtractor {
  return new class {
    ofCheckbox(c: M.CheckBox): string | undefined { return c.judgementText; }
    ofOption(o: M.Option): string | undefined { return o.judgementText; }
    ofEnumeration(e: M.Enumeration): string | undefined { return e.judgementText; }
    ofBlock(b: M.Block): string | undefined { return b.judgementText; }
    ofConditional(c: M.Conditional): string | undefined { return c.judgementText; }
  };
}

export function makeText(parts: M.TopLevel[], extractor: M.TextExtractor, suppressed: string[]): string {
 let result = parts.map(c => {
    if (c.kind === "category") {
      return getTexts(c.selectables, suppressed, extractor)
        .map(t => expandVariablesInString(t, parts, true)).join("");
    } else if (c.kind === "block") {
      return extractor.ofBlock(c) || "";
    } else if (c.kind === "enumeration") {
      return makeEnumeration(c, parts, extractor);
    } else if (c.kind === "conditional") {
      if (checkConditional(c, parts)) {
        const data = extractor.ofConditional(c);
        if (data) {
          return expandVariablesInString(data, parts, true);
        } else {
          return "";
        }
      }
    } else {
      throw new Error("unknown top level kind");
    }
  }).join("");
  const blocks = parts.filter(x => x.kind === "block");
  for (const b of blocks) {
    const regEx = new RegExp((b as M.Block).text + "(\\n|$)");
    result = result.replace(regEx, "\n");
  }
  return result;
}

export function getSuppressedConditionalIds(data: M.TopLevel[]): string[][] {
  const suppressedNormal: string[] = [];
  const suppressedJudgement: string[] = [];

  for (const topLevel of data) {
    if (topLevel.kind === "conditional") {
      if (checkConditional(topLevel, data)) {
        for (const anded of topLevel.precondition) {
          for (const literal of anded) {
            if (!literal.negated) {
              if (topLevel.normalText) {
                suppressedNormal.push(literal.id);
              }
              if (topLevel.judgementText) {
                suppressedJudgement.push(literal.id);
              }
            }
          }
        }
      }
    }
  }

  return [suppressedNormal, suppressedJudgement];
}

export function checkConditional(c: M.Conditional, data: M.TopLevel[]): boolean {
  outer:
  for (const anded of c.precondition) {
    for (const literal of anded) {
      if (isClicked(literal.id, data) === literal.negated) {
        continue outer;
      }
    }
    return true;
  }
  return false;
}

export function isClicked(clickableId: string, data: M.TopLevel[]): boolean {
  for (const category of data.filter(p => p.kind === "category").map(c => c as M.Category)) {
    for (const selectable of category.selectables) {
      if (selectable.kind === "box") {
        if (selectable.value && selectable.conditionalId === clickableId) {
          return true;
        }
      } else {
        for (const option of selectable.options) {
          if (option.conditionalId === clickableId && selectable.value === option.name) {
            return true;
          }
        }
      }
    }
  }

  return false;
}


export function getTexts(ss: M.Selectable[], suppressed: string[], textExtractor: M.TextExtractor): string[] {
  const ret: string[] = [];

  for (const s of ss) {
    if (s.kind === "box" && s.value && !s.enumeration && (!s.conditionalId || suppressed.indexOf(s.conditionalId) === -1)) {
      const result = textExtractor.ofCheckbox(s);
      if (result) {
        ret.push(result);
      }
    } else if (s.kind === "group") {
      for (const o of s.options) {
        if (s.value === o.name && (!o.conditionalId || suppressed.indexOf(o.conditionalId) === -1)) {
          const result = textExtractor.ofOption(o);
          if (result) {
            ret.push(result);
          }
        }
      }
    }
  }
  return ret;
}

export function expandVariablesInString(s: string, data: M.TopLevel[], addFullStop: boolean): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const lookup: (string) => string = (name) => {
    if (name === "%Gestern%") {
      return makeDateString(yesterday);
    } else if (name === "%Heute%") {
      return makeDateString(today);
    } else if (name === "%Morgen%") {
      return makeDateString(tomorrow);
    }
    const vars = allVariables(data);
    const matching = vars.find(v => "%" + v.id + "%" === name);
    if (matching) {
      if (textOfVariable(matching)) {
        return textOfVariable(matching);
      } else {
        return "---";
      }
    } else {
      return "---";
    }
  };
  s = s.replace(/%[^%]+%/g, lookup);
  const brackets = s.match(/(\[]*?[^\]]*?])/g);
  if (brackets != null) {
    for (const t of brackets) {
      if (t.includes("---")) {
        s = s.replace(t, "");
      }
    }
  }
  s = s.replace(/(---)/g, ""); // "Fehlzeichen" weg
  s = s.replace(/\s\s+/g, " "); // doppelt oder mehr Leerzeichen weg
  s = s.replace(/\[|\]/g, ""); // Klammern weg
  s = s.trim();
  if (addFullStop) {
    s = s.replace(/(\s*\.?\s*$)/, ". "); // Punkt am Ende einfügen, falls keiner da ist
  }
  return s;
}

export function makeDateString(d: Date): string {
  return d.toLocaleDateString("de-DE", { year: "numeric", month: "numeric", day: "numeric" });
}

export function allVariables(data: M.TopLevel[]): M.Variable[] {
  let vars: M.Variable[] = [];

  for (const c of data) {
    if (c.kind === "category") {
      for (const sel of c.selectables) {
        if (sel.kind === "box" && sel.value) {
          vars = vars.concat(sel.variables);
        } else if (sel.kind === "group") {
          for (const o of sel.options) {
            if (sel.value === o.name) {
              vars = vars.concat(o.variables);
            }
          }
        }
      }
    }
  }

  return vars;
}

export function textOfVariable(v: M.Variable): string | undefined {
  if (v.kind === "oc") {
    return v.value;
  } else if (v.kind === "mc") {
    return v.values.filter(val => val[1]).map(val => val[0]).join(", ");
  } else if (v.kind === "text") {
    return v.value;
  } else if (v.kind === "number") {
    if (v.value !== 0) {
      return "" + v.value;
    } else {
    return "";
    }
  } else if (v.kind === "date") {
    return v.value.day + "." + v.value.month + "." + v.value.year;
  } else if (v.kind === "ratio") {
    return (v.numerator / v.denominator).toLocaleString("de-DE", { maximumFractionDigits: v.fractionDigits });
  }

  return assertUnreachable(v);
}

export function makeNormalCategory(c: M.Category): void {
  if (hasSelection(c)) { return; }

  for (const entry of c.selectables) {
    if (entry.kind === "box") {
      if (entry.normal) {
        entry.value = true;
      }
    } else if (entry.kind === "group") {
      for (const o of entry.options) {
        if (o.normal) {
          entry.value = o.name;
        }
      }
    }
  }
}

export function hasSelection(c: M.Category): boolean {
  for (const entry of c.selectables) {
    if (entry.kind === "box" && entry.value) {
      return true;
    } else if (entry.kind === "group" && entry.value) {
      return true;
    }
  }
  return false;
}


export function makeEnumeration(e: M.Enumeration, data: M.TopLevel[], textExtractor: M.TextExtractor): string {
  const items: string[] = getRelevantEnumerationItems(e.id, data, textExtractor);
  if (items.length === 0) {
    return "";
  } else if (items.length === 1) {
    return textExtractor.ofEnumeration(e) + items[0] + ". ";
  } else if (items.length === 2) {
    return textExtractor.ofEnumeration(e) + items[0] + " und " + items[1] + ". ";
  } else if (items.length > 2) {
    return textExtractor.ofEnumeration(e) + items.slice(0, items.length - 1).join(", ") + " und " + items[items.length - 1] + " ";
  }
}

export function getRelevantEnumerationItems(id: string, data: M.TopLevel[], textExtractor: M.TextExtractor): string[] {
  const items: string[] = [];

  for (const p of data) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "box") {
          if (s.value && s.enumeration === id) {
            const result = textExtractor.ofCheckbox(s);
            if (result) {
              items.push(expandVariablesInString(result, data, false));
            }
          }
        }
      }
    }
  }

  return items;
}

export function assertUnreachable(x: never): never {
  throw new Error("should not be reachable: " + x);
}