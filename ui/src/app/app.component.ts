import { Component } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dateParser: NgbDateParserFormatter) {
    if (localStorage.getItem("emptyDialog")) {
      this.parts = JSON.parse(localStorage.getItem("emptyDialog"))
    } else {
      this.parts = [
        { kind: "category", name: "Gesamt I", selectables:
          [
            { kind: "box", normal: false , text: "Projektionsradiographie: Thorax in 1 Ebene "  , name: "Thorax p.a."      , value: false , variables: [] } ,
            { kind: "box", normal: false , text: "Projektionsradiographie: Thorax in 2 Ebenen " , name: "Thorax 2 Ebenen"  , value: false , variables: [] } ,
            { kind: "box", normal: false , text: "Projektionsradiographie: Thorax im Liegen "   , name: "Thorax im Liegen" , value: false , variables: [] } ,
          ]
        },
        { kind: "category", name: "Gesamt II", selectables:
          [
            {
              kind: "group",
              name: "CG1",
              options: [
                { kind: "option", normal: false , text: "vom %Heute% mit Voraufnahmen vom %Gestern%. " , name: "von heute mit VA gestern"  , variables: [] } ,
                { kind: "option", normal: false , text: "vom %Heute% mit Voraufnahmen vom %G1%. "      , name: "von heute mit VA variabel" , variables: [ { kind: "date", id: "G1", textBefore: "Voraufnahme [Datum]", textAfter: "", value: { year: 2018, month: 10, day: 23 } } ] } ,
                { kind: "option", normal: false , text: "vom %Heute% ohne Voraufnahmen. "              , name: "von heute ohne VA"         , variables: [] } ,
                { kind: "option", normal: false , text: "vom %G2% mit Voraufnahmen vom %G3%. "         , name: "von variabel mit VA"       , variables: [{ kind: "date", id: "G2", textBefore: "von [Datum]", textAfter: "", value: { year: 2018, month: 10, day: 23 } }, { kind: "date", id: "G3", textBefore: "Voraufnahme [Datum]", textAfter: "", value: { year: 2018, month: 10, day: 23 } }] } ,
                { kind: "option", normal: false , text: "vom %G4% ohne Voraufnahmen. "                 , name: "von variable ohne VA"      , variables: [{ kind: "date", id: "G4", textBefore: "von [Datum]", textAfter: "", value: { year: 2018, month: 10, day: 23 } }] } ,
              ]
            }
          ]
        },
        { kind: "category", name: "Gesamt III", selectables:
          [
            { kind: "box", normal: false , text: "Indikation überprüft und nach § 23 RöV bestätigt."                                                , name: "Indikation geprüft" , value: true  , variables: [] } ,
            { kind: "box", normal: false , text: "\n\nZVK %I1% %I2%. "                                                                              , name: "ZVK"                , value: false , variables: [ { kind: "oc", id: "I1", textBefore: "", textAfter: "", values: [ "re.", "li" ] }, { kind: "oc", id: "I2", textBefore: "", textAfter: "", values: [ "jugulär", "subclaviculär" ] } ] } ,
            { kind: "box", normal: false , text: "\n\nShaldon-Katheter %I3% %I4%. "                                                                 , name: "Shaldon-Katheter"   , value: false , variables: [ { kind: "oc", id: "I3", textBefore: "", textAfter: "", values: [ "re.", "li" ] }, { kind: "oc", id: "I4", textBefore: "", textAfter: "", values: [ "jugulär", "subclaviculär" ] } ] } ,
            { kind: "box", normal: false , text: "\n\nSchrittmacher %I5% pektoral, %I6% konnektierte Sondenkabel in Projektion auf %I7% endend. "   , name: "Schrittmacher"      , value: false , variables: [ { kind: "oc", id: "I5", textBefore: "", textAfter: "", values: [ "re.", "li" ] }, { kind: "oc", id: "I6", textBefore: "konnektierte Sondenkabel", textAfter: "", values: [ "1", "2", "3" ] },{ kind: "oc", id: "I7", textBefore: "in Projektion auf", textAfter: "", values: [ "rechtes Atrium", "rechten Ventrikel", "Sinus Coronarius", "epikardial" ] } ] } ,
            { kind: "box", normal: false , text: "\n\n Drainage %I8% %I9%. "                                                                        , name: "Drainage"           , value: false , variables: [ { kind: "oc", id: "I8", textBefore: "", textAfter: "", values: [ "re.", "li" ] }, { kind: "oc", id: "I9", textBefore: "", textAfter: "", values: [ "pleural", "mediastinal", "perikardial" ] } ] } ,
          ]
        },
        { kind: "block", text: "\n\nZwerchfell, Pleura: \n" },
        { kind: "category", name: "Zwerchfell", selectables:
          [
            {
              kind: "group",
              name: "CG2",
              options: [
                { kind: "option", normal: true  , text: "Beidseits Zwerchfelle orthotop, glatt begrenzt, Randwinkel entfaltet. "                                    , name: "normal"        , variables: [] } ,
                { kind: "option", normal: false , text: "Beidseits Zwerchfelle orthotop, glatt begrenzt, Randwinkel verplumpt. "                                    , name: "Erguss klein"  , variables: [] } ,
                { kind: "option", normal: false , text: "Beidseits Zwerchfelle orthotop, unscharf, bei flächiger Transparenzminderung des Unterfelds. "             , name: "Erguss mittel" , variables: [] } ,
                { kind: "option", normal: false , text: "Beidseits Zwerchfelle orthotop, unscharf, bei flächiger Transparenzminderung des Unter- und MIttelfelds. " , name: "Erguss groß"   , variables: [] } ,
              ]
            }
          ]
        },
        { kind: "category", name: "Pleura", selectables:
          [
            { kind: "box" , normal: true , text: "Keine pleurale Dehiszenz."                                , name: "normal"       , value: false , variables: [] },
            { kind: "box" , normal: false, text: "Pleurale Dehiszenz"                                       , name: "Dehiszenz"    , value: false , variables: [] },
            { kind: "box" , normal: false, text: "Pneumothorax %P1% %P2% mit %P3% cm pleuraler Dehiszenz. " , name: "Pneumothorax" , value: false , variables:
              [
                { kind: "oc"     , id: "P1" , textBefore: ""    , textAfter: ""                       , values: [ "re."    , "li."     , "bds." ] } ,
                { kind: "oc"     , id: "P2" , textBefore: ""    , textAfter: ""                       , values: [ "apikal" , "lateral" , "basal"    , "mantelförmig" ] } ,
                { kind: "number" , id: "P3" , textBefore: "mit" , textAfter: "mm pleuraler Dehiszenz" , value: 0 }         ,
              ]
            }
          ]
        },
        { kind: "block", text: "\n\nMediastinum: \n" },
        { kind: "category", name: "Mediastinum", selectables:
          [
            { kind: "box", normal: true  , text: "Mediastinum mittelständig. " , name: "normal" , value: false , variables: [] } ,
            { kind: "box", normal: false , text: "Mediastinum nach %M1% verlagert. " , name: "verlagert" , value: false , variables: [ { kind: "oc", id: "M1", textBefore: "nach ", textAfter: "", values: [ "re.", "li" ] } ] } ,
            { kind: "box", normal: false , text: "Mediastinum im %M2% Anteil verbreitert. " , name: "verbreitert" , value: false , variables: [ { kind: "oc", id: "M2", textBefore: "im ", textAfter: "Anteil", values: [ "oberen", "mittleren", "unteren" ] } ] } ,
          ]
        },
        { kind: "category", name: "Aorta", selectables:
          [
            { kind: "box" , normal: true  , text: "Thorakale Aorta unauffällig konfiguriert." , name: "Aorta unauffällig"        , value: false , variables: [] }    ,
            { kind: "box" , normal: false , text: "elongiert"                                 , name: "Aorta elongiert"          , value: false , variables: [] , enumeration: 'AZ1' } ,
            { kind: "box" , normal: false , text: "arteriosklerotisch verkalkt"               , name: "Aorta arteriosklerotisch" , value: false , variables: [] , enumeration: 'AZ1' } ,
            { kind: "box" , normal: false , text: "aneurysmatisch dilatiert"                  , name: "Aorta dilatiert"          , value: false , variables: [] , enumeration: 'AZ1' } ,
          ]
        },
        { kind: "enumeration", id: "AZ1", text: "Thorakale Aorta " },
        { kind: "block", text: "\n\nHerzsilhouette  " },
        { kind: "category", name: "Herz", selectables:
          [
            { kind: "box", normal: true  , text: " unauffällig. " , name: "Herz normal" , value: false , variables: [] } ,
            { kind: "group", name: "CG3", options:
              [
                { kind: "option", normal: false, name: "Herz verbreitert", text: " im Querdurchmesser verbreitert.  ", variables: [] },
                { kind: "option", normal: false, name: "Herz verbreitert, aortal", text: "\nHerz im Querdurchmesser verbreitert und aortal konfiguriert. ", variables: [] },
                { kind: "option", normal: false, name: "Herz verbreitert, mitral", text: "\nHerz im Querdurchmesser verbreitert und mitral konfiguriert. Trachealbifurkation aufgeweitet. ", variables: [] },
              ]
            },
            { kind: "box", normal: false  , text: "Die Herz-Thorax-Relation beträgt %H1%. " , name: "Herz-Thorax-Relation" , value: false , variables: [ { kind: "ratio", id: "H1", textBefore: "Herz-Thorax-Relation x:y", textAfter: "", numerator: 0, denominator: 0, fractionDigits: 2  } ] },
          ]
        },
        { kind: "block", text: "\n\nLungenkerne und -peripherie: \n" },
        { kind: "category", name: "Hilus", selectables:
          [
            { kind: "box", normal: true  , text: "Hili gefäßtypisch konfiguriert. " , name: "normal" , value: false , variables: [] } ,
            { kind: "group", name: "CG5", options:
              [
                { kind: "option" , normal: false , name: "unscharf"            , text: "Hili unscharf konfiguriert. "            , variables: [] } ,
                { kind: "option" , normal: false , name: "unscharf, verplumpt" , text: "Hili unscharf konfiguriert, verplumpt. " , variables: [] } ,
              ]
            },
          ]
        },
        { kind: "category", name: "Lunge", selectables:
          [
            { kind: "box", normal: true  , text: "Zentrale und periphere Lungengefäßzeichnung regulär, keine alveolären oder interstitiellen Verdichtungen abgrenzbar. " , name: "normal" , value: false , variables: [] } ,
            { kind: "group", name: "CG4", options:
              [
                { kind: "option" , normal: false , name: "pv-Stau I"   , text: "Pulmonalvenöse Umverteilung mit dilatierten, scharf begrenzten Oberlappengefäßen (vaskuläre Kranialisation) und normalem Lungeninterstitium. "                                                          , variables: [] } ,
                { kind: "option" , normal: false , name: "pv-Stau II"  , text: "Mäßige Hypervolämie mit dilatierten, unscharf begrenzten Oberlappengefäßen und Bronchialmanschettenzeichen. "                                                                                           , variables: [] } ,
                { kind: "option" , normal: false , name: "pv-Stau III" , text: "Deutliche Hypervolämie mit zentral unscharf begrenzten Lungengefäßen, Bronchialmanschettenzeichen und vermehrter interstitieller Zeichnung einschließlich Kerley-Linien (interstitielles Lungenödem). " , variables: [] } ,
                { kind: "option" , normal: false , name: "pv-Stau IV"  , text: "Massive Hypervolämie mit zentral und peripher unscharf abgrenzbaren Lungengefäßen sowie deutlich vermehrt interstitieller und fleckförmiger Zeichnung (interstitelles und alveoläres Lungenödem). "     , variables: [] } ,
              ]
            },
            { kind: "box", normal: false  , text: "[%D1%] Minderbelüftungen [%D2%] [betont im %D3%]. " , name: "Dystelektasen" , value: false , variables:
              [
                { kind: "oc" , id: "D1" , textBefore: "" , textAfter: "" , values: ["streifenförmige" , "flächige" ] } ,
                { kind: "oc" , id: "D2" , textBefore: "" , textAfter: "" , values: ["re."             , "li."          , "bds." ] }      ,
                { kind: "oc" , id: "D3" , textBefore: "" , textAfter: "" , values: ["Oberfeld"        , "Mittelfeld"   , "Unterfeld" ] } ,
              ]
            },
            { kind: "box", normal: false  , text: "Tumorverdächtige Raumforderung mit folgenden Charakteristika: [Lage im %L1%, ][Ausdehnung über %L2% cm, ][Form %L3%, ][Begrenzung %L4%.] " , name: "Raumforderung" , value: false , variables:
              [
                { kind: "text"   , id: "L1" , textBefore: "Lage im "        , textAfter: ""   , value: "" },
                { kind: "number" , id: "L2" , textBefore: "Ausdehnung über" , textAfter: "cm" , value: 0  },
                { kind: "text"   , id: "L3" , textBefore: "Form "           , textAfter: ""   , value: "" },
                { kind: "text"   , id: "L4" , textBefore: "Begrenzung"      , textAfter: ""   , value: "" },
              ]
            },
          ]
        },
      ];
    }
  }

  text: string = "";
  modalVariables: Variable[] = [];

  parts: TopLevel[] = [];

  makeText(): void {
    this.text = this.parts.map(c => {
      if (c.kind === "category") {
        return getTexts(c.selectables).map(t => expandVariablesInString(t, this.parts)).join("")
      } else if (c.kind === "block") {
        return c.text;
      } else if (c.kind === "enumeration") {
        return makeEnumeration(c, this.parts);
      } else {
        throw new Error("unkonwn top level kind");
      }
    }).join("");
  }

  copyText(): void {
    (document.getElementById("output") as HTMLInputElement).select();
    document.execCommand('copy');
  }

  makeNormal(): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        makeNormalCategory(p);
      }
    }
    this.makeText();
  }

  clicked(clicked: Clickable, parent?: Group): void {
    if (clicked.kind === "box" && clicked.variables.length > 0 && !clicked.value) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    } else if (clicked.kind === "option" && clicked.variables.length > 0 && parent && parent.value !== clicked.name) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    }
    setTimeout(() => this.makeText(), 0);
  }

  endVariableSelection(): void {
    this.makeText();
  }

  saveDialog(): void {
    localStorage.setItem("emptyDialog", JSON.stringify(JSON.parse(this.text)));
    this.parts = JSON.parse(this.text);
    this.text = "";
  }
}

function getTexts(ss: Selectable[]): string[] {
  const ret: string[] = [];

  for (const s of ss) {
    if (s.kind === "box" && s.value && !s.enumeration) {
      ret.push(s.text);
    } else if (s.kind === "group") {
      for (const o of s.options) {
        if (s.value === o.name) {
          ret.push(o.text);
        }
      }
    }
  }

  return ret;
}

function expandVariablesInString(s: string, data: TopLevel[]): string {
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
      return textOfVariable(matching) || "-";
    } else {
      return "-";
    }
  }

  return s.replace(/%[^%]+%/g, lookup);
}

function makeDateString(d: Date): string {
  return d.toLocaleDateString("de-DE", { year: 'numeric', month: 'numeric', day: 'numeric' });
}

function allVariables(data: TopLevel[]): Variable[] {
  let vars: Variable[] = [];

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

function textOfVariable(v: Variable): string | undefined {
  if (v.kind === "oc") {
    return v.value;
  } else if (v.kind === "text") {
    return v.value;
  } else if (v.kind === "number") {
    return "" + v.value;
  } else if (v.kind === "date") {
    return v.value.day + "." + v.value.month + "." + v.value.year;
  } else if (v.kind === "ratio") {
    return (v.numerator / v.denominator).toLocaleString("de-DE", { maximumFractionDigits: v.fractionDigits });
  }
}

function makeNormalCategory(c: Category): void {
  if (hasSelection(c)) return;

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

function hasSelection(c: Category): boolean {
  for (const entry of c.selectables) {
    if (entry.kind === "box" && entry.value) {
      return true;
    } else if (entry.kind === "group" && entry.value) {
      return true;
    }
  }

  return false;
}

function makeEnumeration(e: Enumeration, data: TopLevel[]): string {
  const items: string[] = getRelevantEnumerationItems(e.id, data);
  if (items.length === 0) {
    return "";
  } else if (items.length === 1) {
    return e.text + items[0];
  } else if (items.length === 2) {
    return e.text + items[0] + " und " + items[1];
  } else if (items.length > 2) {
    return e.text + items.slice(0, items.length - 1).join(", ") + " und " + items[items.length - 1];
  }
}

function getRelevantEnumerationItems(id: string, data: TopLevel[]): string[] {
  const items: string[] = [];

  for (const p of data) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "box") {
          if (s.value && s.enumeration === id) {
            items.push(expandVariablesInString(s.text, data));
          }
        }
      }
    }
  }

  return items;
}

type Selectable = CheckBox | Group;
type Clickable  = CheckBox | Option;

export interface CheckBox {
  kind: "box";
  name: string;
  value: boolean;
  text: string;
  normal: boolean;
  variables: Variable[];
  enumeration?: string;
}

export interface Group {
  kind:    "group";
  name:    string;
  options: Option[];
  value?:  string;
}

export interface Option {
  kind: "option";
  name: string;
  text: string;
  normal: boolean;
  variables: Variable[];
}

type TopLevel = Category | Block | Enumeration;

export interface Category {
  kind: "category";
  name: string;
  selectables: Selectable[];
}

export interface Block {
  kind: "block";
  text: string;
}

export interface Enumeration {
  kind: "enumeration";
  text: string;
  id:   string;
}

type Variable = VariableOC | VariableText | VariableNumber | VariableDate | VariableRatio

export interface VariableCommon {
  id:         string;
  textBefore: string;
  textAfter:  string;
}

export interface VariableOC extends VariableCommon {
  kind:   "oc";
  value?: string;
  values: string[];
}

export interface VariableText extends VariableCommon {
  kind:  "text";
  value: string;
}

export interface VariableNumber extends VariableCommon {
  kind:  "number";
  value: number;
}

export interface VariableDate extends VariableCommon {
  kind:  "date";
  value: NgbDateStruct;
}

export interface VariableRatio extends VariableCommon {
  kind:           "ratio";
  numerator:      number;
  denominator:    number;
  fractionDigits: number;
}
