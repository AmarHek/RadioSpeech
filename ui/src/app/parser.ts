import * as M from './model';
import * as T from './takers';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { flatMap, assertNever } from './util';

export function take(text: string, structure: M.TopLevel[]): void {
  const takers = createTakers(structure);

  let textPosition = 0;
  let takerPosition = 0;

  outer: while (textPosition < text.length) {
    const sub = text.substr(textPosition);
    for (let i = takerPosition; i < takers.length; i++) {
      const result = takers[i](sub);
      if (result) {
        textPosition += result.lengthTaken;
        result.setter();
        takerPosition = i + 1;
        continue outer;
      }
    }
    textPosition++;
  }
}

function createTakers(structure: M.TopLevel[]): T.Taker[] {
  return flatMap(structure, s => createTopLevelTakers(s, structure))
}

function createTopLevelTakers(t: M.TopLevel, structure: M.TopLevel[]): T.Taker[] {
  switch (t.kind) {
    case 'block':       return [T.text(t.text)];
    case 'category':    return createCategoryTakers(t, structure);
    case 'conditional': return [T.dummy];
    case 'enumeration': return [T.dummy];
    default: return assertNever(t);
  }
}

function createCategoryTakers(c: M.Category, structure: M.TopLevel[]): T.Taker[] {
  const ret: T.Taker[] = [];

  for (let s of c.selectables) {
    switch (s.kind) {
      case 'box': ret.push(boxTaker(s, structure)); break;
      case 'group': ret.push(groupTaker(s, structure)); break;
      default: assertNever(s);
    }
  }

  return ret;
}

function groupTaker(g: M.Group, structure: M.TopLevel[]): T.Taker {
  return T.or(
    g.options.map(o => {
      const subTaker = takeOfInterpolatedString(o.text, structure);
      return (s: string) => {
        const result = subTaker(s);
        if (result) {
          return {
            lengthTaken: result.lengthTaken,
            setter: () => {
              g.value = o.name;
              result.setter();
            }
          };
        }
      }
    })
  );
}

export function boxTaker(c: M.CheckBox, structure: M.TopLevel[]): T.Taker {
  console.log(">" + c.text + "<");
  const subTaker = takeOfInterpolatedString(c.text, structure);
  return s => {
    const result = subTaker(s);
    if (result) {
      return {
        lengthTaken: result.lengthTaken,
        setter: () => {
          c.value = true;
          result.setter();
        },
      };
    }
  }
}

function takeOfInterpolatedString(s: string, structure: M.TopLevel[]): T.Taker {
  if (s.indexOf("%Heute%") != -1 || s.indexOf("%Gestern%") != -1) {
    return T.fail;
  }

  const takers: T.Taker[] = [];
  const re = /%[^%]+%/g;
  let result;

  let endOfLastMatch = 0;
  while ((result = re.exec(s)) != null) {
    const text = s.substring(endOfLastMatch, result.index);
    takers.push(T.text(text));
    const varId = result[0].substring(1, result[0].length - 1);
    const textAfter = s.substring(result.index + result[0].length);
    takers.push(takerOfVariable(M.resolve(varId, structure), textAfter));
    endOfLastMatch = result.index + result[0].length;
  }
  takers.push(T.text(s.substring(endOfLastMatch, s.length)));

  return T.compound(takers);
}

function takerOfVariable(v: M.Variable, textAfter: string): T.Taker {
  switch (v.kind) {
    case 'text':   return takeOfText(v, textAfter);
    case 'date':   return takeOfdate(v);
    case 'mc':     return takerOfMcVariable(v);
    case 'number': return takerOfNumber(v);
    case 'ratio':  return takerOfRation(v);
    case 'oc':     return takerOfOcVariable(v);
    default:       return assertNever(v);
  }
}

function takeOfText(v: M.VariableText, textAfter: string): T. Taker {
  if (textAfter.length === 0 || textAfter.substring(0, 1) === "%") {
    return T.dummy;
  } else {
    const terminationChar = textAfter.substring(0, 1);
    return s => {
      const i = s.indexOf(terminationChar)
      if (i !== -1) {
        return {
          lengthTaken: i,
          setter: () => { v.value = s.substring(0, i) }
        };
      }
    }
  }
}

function takerOfNumber(v: M.VariableNumber): T.Taker {
  return T.addSetter(T.decimal, (s) => { v.value = +s.replace(",", ".") });
}

function takerOfRation(v: M.VariableRatio): T.Taker {
  return T.addSetter(T.decimal, (s) => { v.numerator = +s.replace(",", "."); v.denominator = 1 });
}

function takeOfdate(v: M.VariableDate): T.Taker {
  return s => {
    const match = /^(\d\d?)\.(\d\d?)\.(\d\d\d\d)/.exec(s);
    if (match) {
      return {
        lengthTaken: match[0].length,
        setter: () => {
          v.value = {
            day: +match[1],
            month: +match[2],
            year: +match[3],
          };
        }
      };
    }
  }
}

function takerOfOcVariable(oc: M.VariableOC): T.Taker {
  return (s: string) => {
    const foundIt = oc.values.find(v => v === s.substring(0, v.length));
    if (foundIt) {
      return {
        lengthTaken: foundIt.length,
        setter: () => { oc.value = foundIt }
      };
    }
  };
}

function takerOfMcVariable(mc: M.VariableMC): T.Taker {
  return T.compound(
    mc.values.map(
      (v) => T.optional(T.addSetter(T.compound([T.text(v[0]), T.optional(T.text(", "))]), () => { v[1] = true; }))
    )
  );
}
