import * as M from "./model";
import { KeywordAlt } from "./keywordAlt";


export function splitVariables(toSplit: string[], splitter: string): string[][] {
  const result: string[][] = [];
  for (const splitted of toSplit) {
    const toTrim = splitted.split(splitter);
    for (let i = 0; i < toTrim.length; i++) {
      toTrim[i] = toTrim[i].trim();
    }
    result.push(toTrim);
  }
  return result;
}


export function createDic(parts: M.TopLevel[]): KeywordAlt[] {
  let name: string;
  let kind: string;
  let category: string;
  const keywords: KeywordAlt[] = [];
  for (const p of parts) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "box" && s.data["bau"] !== undefined) {
          category = p.name;
          kind = s.kind;
          name = s.name;
          const splittedSynonyms = s.data["bau"][0].split(";");
          const currKeyword = new KeywordAlt(name, kind, category);
          for (const o of s.variables) {
            const currVariables = new Array<string>();
            currKeyword.textBefore.push(o.textBefore);
            currKeyword.textAfter.push(o.textAfter);

            currKeyword.id = p.name + "" + currKeyword.name;

            // oc
            if (o.kind === "oc" && o.data["syn"] !== undefined) {
              const splittedVariables = o.data["syn"][0].split("/");
              currKeyword.variables3D.push(splitVariables(splittedVariables, ";"));
              for (const v of o.values) {
                currVariables.push(v);
              }
              currKeyword.variableKind1D.push("oc");
            } else if (o.kind === "mc" && o.data["syn"] !== undefined) {
              const splittedVariables = o.data["syn"][0].split(";");
              currKeyword.variables3D.push(splitVariables(splittedVariables, ","));
              for (const v of o.values) {
                currVariables.push(v[0]);
              }
              currKeyword.variableKind1D.push("mc");
            } else {
              currKeyword.variables3D.push([[""]]);
              currKeyword.variableKind1D.push(o.kind.valueOf());
            }
            currKeyword.variables2D.push(currVariables);

          }
          // alle Synonyme hinzufügen
          for (let i = 0; i < splittedSynonyms.length; i++) {
            const synonymKeyword: KeywordAlt = JSON.parse(JSON.stringify(currKeyword));
            synonymKeyword.synonym = splittedSynonyms[i];
            keywords.push(synonymKeyword);
          }
        }
        if (s.kind === "group" && s.data["bau"] !== undefined) {
          for (const o of s.options) {
            if (o.data["bau"] !== undefined) {
              category = p.name;
              kind = s.kind;
              name = o.name;
              const splittedSynonyms = o.data["bau"][0].split(";");
              const currKeyword = new KeywordAlt(name, kind, category);

              for (const v of o.variables) {
                const currVariables = new Array<string>();
                currKeyword.textBefore.push(v.textBefore);
                currKeyword.textAfter.push(v.textAfter);

                // oc
                if (v.kind === "oc" && v.data["syn"] !== undefined) {
                  const splittedVariables = v.data["syn"][0].split("/");

                  currKeyword.variables3D.push(splitVariables(splittedVariables, ";"));
                  for (const va of v.values) {
                    currVariables.push(va);
                  }
                  currKeyword.variableKind1D.push("oc");
                } else if (v.kind === "mc" && v.data["syn"] !== undefined) {
                  const splittedVariables = v.data["syn"][0].split(";");

                  currKeyword.variables3D.push(splitVariables(splittedVariables, ","));
                  for (const va of v.values) {
                    currVariables.push(va[0]);
                  }
                  currKeyword.variableKind1D.push("mc");
                } else {
                  currKeyword.variables3D.push([[""]]);
                  currKeyword.variableKind1D.push(v.kind.valueOf());
                }
                currKeyword.variables2D.push(currVariables);
              }
              console.log(s.name + " " + currKeyword.name);
              currKeyword.id = s.name + "" + currKeyword.name;

              // alle synonyme Keywords pushen
              for (let i = 0; i < splittedSynonyms.length; i++) {
                let synonymKeyword: KeywordAlt = JSON.parse(JSON.stringify(currKeyword));
                synonymKeyword.synonym = splittedSynonyms[i];
                keywords.push(synonymKeyword);
                console.log(synonymKeyword.id);
              }
            }
          }
        }
      }
    }
  }
  console.log(keywords);
  findOverlap(keywords);
  return keywords;
}

function findOverlap(keywords: KeywordAlt[]) {
  let knownWords: KeywordAlt[] = [];
  knownWords = knownWords.concat(keywords);
  for (const w of keywords) {
    for (const k of knownWords) {
      if (w.synonym.localeCompare(k.synonym) !== 0 && w.synonym.toLowerCase().includes(k.synonym.toLowerCase())) {
        w.overlap.push(k);
      }
    }
  }
}

export function resetValue(parts: M.TopLevel[]): void {
  for (const p of parts) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "group") {
          for (const o of s.options) {
            // o.normal = false;
            s.value = "";
            for (const v of o.variables) {
              if (v.kind === "oc") {
                v.value = "";
              } else if (v.kind === "mc") {
                for (const va of v.values) {
                  va[1] = false;
                }
              } else if (v.kind === "text") {
                v.value = "";
              } else if (v.kind === "number") {
                v.value = 0;
              } else if (v.kind === "ratio") {
                v.numerator = 0;
                v.denominator = 0;
              } else if (v.kind === "date") {
                v.value = null;
              }
            }

          }
        } else if (s.kind === "box") {
          s.value = false;
          // s.normal = false;
          for (const v of s.variables) {
            if (v.kind === "oc") {
              v.value = "";
            } else if (v.kind === "mc") {
              for (const va of v.values) {
                va[1] = false;
              }
            } else if (v.kind === "text") {
              v.value = "";
            } else if (v.kind === "number") {
              v.value = 0;
            } else if (v.kind === "ratio") {
              v.numerator = 0;
              v.denominator = 0;
            } else if (v.kind === "date") {
              v.value = null;
            }
          }
        }
      }
    }
  }
}


// https://gist.github.com/keesey/e09d0af833476385b9ee13b6d26a2b84
export function levenshtein(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) {
    return bn;
  }
  if (bn === 0) {
    return an;
  }
  const matrix = new Array<number[]>(bn + 1);
  for (let i = 0; i <= bn; ++i) {
    const row = matrix[i] = new Array<number>(an + 1);
    row[0] = i;
  }
  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j) {
    firstRow[j] = j;
  }
  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1], // substitution
          matrix[i][j - 1], // insertion
          matrix[i - 1][j] // deletion
        ) + 1;
      }
    }
  }
  return matrix[bn][an];
}

export function createDummyBox(parts: M.TopLevel[], name: string): M.CheckBox {
  for (const p of parts) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "box" && s.data["bau"] !== undefined) {
          if (s.name === name) {
            return s;
          }
        }
      }
    }
  }
}

export function createDummyGroup(parts: M.TopLevel[], name: string, oName: string): M.Option {
  for (const p of parts) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "group" && s.data["bau"] !== undefined) {
          if (name.includes(s.name)) {
            for (const o of s.options) {
              if (o.name === oName) {
                return o;
              }
            }
          }
        }
      }
    }
  }
}


export function createDummyCategory(parts: M.TopLevel[]): M.TopLevel {
  for (const p of parts) {
    if (p.kind === "category") {
      return p;
    }
  }
}

