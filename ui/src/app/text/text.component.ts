import { Component, OnInit, AfterViewInit, AfterContentInit, HostListener } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as M from '../model'
import * as G from '../generator'
import * as P from '../parser'
import * as T from '../takers'
import { Input } from '@angular/compiler/src/core';
import { stringify } from 'querystring';
import { Key } from 'protractor';
import { TestBed } from '@angular/core/testing';
import { empty } from 'rxjs';
import { Keyword } from './Keyword';
import * as D from './Dictionary';
import { format } from 'util';




declare const $: any;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  ngOnInit(): void {
    //
    var fileInput = document.getElementById('fileInput') as HTMLInputElement;
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    fileInput.addEventListener('change', function (e) {
      var file = fileInput.files[0];
      var textType = /text.*/;
      if (file.type.match(textType)) {
        var reader = new FileReader();
        fileDisplayArea.innerText = "";
        reader.onload = function (e) {
          var test = reader.result;
          let textLeft = document.getElementsByClassName('main') as HTMLCollectionOf<HTMLElement>;
          if (test === '') {
            //textLeft[0].style.gridTemplateColumns = "600px 1fr";
          }
          var isValid = /^[0-9,]*$/.test(test.toString());
          if (isValid) {
            let numbers = reader.result.toString().split(",");
            //text links wird resiszt
            if (textLeft.length != 0) {
              let wid = Number.parseInt(numbers[0]) * 3.7795275591;
              // textLeft[0].style.gridTemplateColumns = wid.toString() + "px 1fr";
            }
            //Kategorien werden resiszt
            let categoryWid = document.getElementsByClassName("category") as HTMLCollectionOf<HTMLElement>;
            if (categoryWid.length != 0) {
              let wid = Number.parseInt(numbers[1]) * 3.7795275591;
              categoryWid[0].style.maxWidth = wid.toString() + "px";
            }
            for (var i = 0; i < categoryWid.length; i++) {
              categoryWid[i].style.maxWidth = "150px";
            }
            //alle restlichen Spalten
            for (var i = 2; i < numbers.length; i++) {
              var transNum = (i * 2) - 1;
              var testStyle = document.createElement('style');
              let wid = Number.parseInt(numbers[i]) * 3.7795275591;
              testStyle.type = 'text/css';
              testStyle.innerHTML = 'tbody>tr>:nth-child(' + transNum + ') { max-width: ' + wid.toString() + 'px;}';
              console.log(testStyle.innerHTML);
              document.getElementsByTagName('head')[0].appendChild(testStyle);
            }
            //dem Rest 300 px max zuweisen
            console.log(numbers.length);
            for (var i: number = numbers.length; i < 20; i++) {
              var transNum = (i * 2) - 1;
              var testStyle = document.createElement('style');
              testStyle.type = 'text/css';
              testStyle.innerHTML = 'tbody>tr>:nth-child(' + transNum + ') { max-width: ' + 500 + 'px;}';
              console.log(testStyle.innerHTML);
              document.getElementsByTagName('head')[0].appendChild(testStyle);
            }
          }
          else {
            alert("illegal config file");
          }
        }
        reader.readAsText(file);
      } else {
        fileDisplayArea.innerText = "File not supported!"
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //32 ist spacebar
    /*if (event.keyCode === 32) {
      this.submit();
    }*/
    this.submit();
  }

  text: string = "";
  judgement: string = "";
  modalVariables: M.Variable[] = [];
  input: string = "";
  completeKeywords = new Map<string, string[]>();
  partialCompleteKeywords = new Map<string, string[]>();
  incompleteKeywords = Array<string>();
  DictionaryPrimary: string[] = new Array<string>();
  keywords: Keyword[] = new Array<Keyword>();
  foundKeywords: Keyword[] = new Array<Keyword>();
  parts: M.TopLevel[] = [];

  resetTexts = new Map<M.CheckBox | M.Option, string>();




  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient, private route: ActivatedRoute) {
    route.paramMap.subscribe(ps => {
      if (ps.get('name')) {
        http.post(environment.urlRoot + 'get', JSON.stringify(ps.get('name'))).subscribe(
          worked => {
            this.parts = worked as any
            const s = "\nSM-Aggregat re. pektoral, 2 konnektierte Sondenkabel in Projektion auf rechtes Atrium, Epikardium endend. "
            const box = (this.parts[5] as any).selectables[2];
            const taker = P.boxTaker(box, this.parts);
            console.log(taker(s));
            console.log(T.compound([T.text("abc"), T.optional(T.text(", "))])("abc, "));
            this.init();
          },
          error => window.alert("An unknown error occured: " + JSON.stringify(error))
        );
      }
    });
  }



  refreshPage() {
    window.location.reload();
  }


  splitVariables(toSplit: string[], splitter: string): string[][] {
    let result: string[][] = new Array();
    for (let splitted of toSplit) {
      let toTrim = splitted.split(";");
      for (var i = 0; i < toTrim.length; i++) {
        toTrim[i] = toTrim[i].trim();
      }
      result.push(toTrim);
    }
    return result;
  }

  logMapElements(value, key, map) {
    console.log(`m[${key}] = ${value}`);
  }


  splitMulti(str, tokens) {
    var tempChar = tokens[0];
    for (var i = 1; i < tokens.length; i++) {
      str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
  }

  deleteEmptyFields(input: Array<string>): Array<string> {
    for (var i = 0; i < input.length; i++) {
      if (input[i].length === 0) {
        input.splice(i, 1);
      }
    }
    return input;
  }

  compareKeywords(arg1: Keyword, arg2: Keyword): number {
    if (arg1.position > arg2.position)
      return 1;
    else if (arg1.position < arg2.position)
      return -1;
    return 0;
  }

  sortKeywords(input: string): void {
    //welche Keywords kommen im input vor?
    for (var i = 0; i < this.foundKeywords.length; i++) {
      var position: number = input.indexOf(this.foundKeywords[i].synonym);
      if (position != -1) {
        this.foundKeywords[i].position = position;
      }
      else {
        this.foundKeywords.splice(i, 1);
        i--;
      }
    }
    //dann sortieren
    this.foundKeywords.sort(this.compareKeywords);
  }




  highlight(text: string, colorCode: string) {
    var inputText: HTMLElement = document.getElementById("inputText");
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) {
      inputText.innerHTML = inputText.innerHTML.substring(0, index) + "<span style=\"background-color: " + colorCode + "\">" + inputText.innerHTML.substring(index, index + text.length) + "</span>" + inputText.innerHTML.substring(index + text.length);
    }
  }



  setKeywordButtons() {
    let counter = 0;
    let knownWords: Array<string> = new Array<string>();
    let knownIDs: Array<number> = new Array<number>();
    let MapID = new Map<number, string[]>();
    let textID = new Map<string, [Keyword, number]>();

    let textIndex: number = 0;
    for (const word of this.keywords) {
      // knownWords = [];

      if (word.id != undefined && word.variables2D.length != 0) {
        if (knownWords.includes(word.id)) {
          var btns = this.keywords.find(x => x.id === word.id);
          var bt = JSON.parse(JSON.stringify(btns.buttons2D));
          word.buttons2D = bt;
        }
        else {
          let final = JSON.parse(JSON.stringify(word.textBefore));
          for (var i = 0; i < word.variables2D.length; i++) {
            let result: string = "";
            let currButton: string[] = new Array();
            for (var j = 0; j < word.variables2D[i].length; j++) {
              result += "<button _ngcontent-c1 id=\"" + counter + i + j + "\" class = \"link\">";
              result += "&nbsp" + word.variables2D[i][j] + "&nbsp";
              result += "</button>";
              result += j < word.variables2D[i].length - 1 ? "/" : "";
              knownIDs.push(counter * 100 + i * 10 + j);
              currButton.push(counter + "" + i + "" + j);
              MapID.set(counter * 100 + i * 10 + j, [word.category, word.kind, word.name, word.variables2D[i][j], word.variableKind1D[i]]);
            }
            //das gibt den Substring in den eckigen Klammern
            if (word.textBefore[i] === undefined || word.textBefore[i] === "") {
              word.textBefore[i] = "[place/holder]";
            }
            if (word.textAfter[i] === undefined) {
              word.textAfter[i] = "";
            }
            if (word.variableKind1D[i] === "oc") {
              var replaceBraces = word.textBefore[i].substring(
                word.textBefore[i].lastIndexOf("["),
                word.textBefore[i].lastIndexOf("]") + 1
              );
              final[i] = word.textBefore[i].replace(replaceBraces, "(" + result + ")");
              if (word.textBefore[i].startsWith(" ")) {
                final[i] += word.textAfter[i] + " ";
              }
              else {
                final[i] += word.textAfter[i] + "\n";
              }
            }
            else {
              var replaceBraces = word.textBefore[i].substring(
                word.textBefore[i].lastIndexOf("[") + 1,
                word.textBefore[i].lastIndexOf("]")
              );
              //final[i] = word.textBefore[i].replace(replaceBraces, result);


              if (word.variableKind1D[i] === "mc") {
                final[i] = word.textBefore[i].replace(replaceBraces, result);
              }
              else {
                final[i] += "<button _ngcontent-c1 class = \"link\" id =\"" + textIndex + i + "text\"><u>.....</u></button>";
                textID.set(textIndex + "" + i + "text", [word, i]);
              }
              // final[i] = word.variableKind1D[i] === "mc" ? word.textBefore[i].replace(replaceBraces, result) : final[i] += "<button _ngcontent-c1 class = \"link\"><u>.....</u></button>";

              if (word.textBefore[i].startsWith(" ")) {
                final[i] += word.textAfter[i] + " ";
              }
              else {
                final[i] += word.textAfter[i] + "\n";
              }
            }
            word.buttons2D.push(currButton);
          }
          document.getElementById(word.id).innerHTML = final.join(' ');
        }
        counter++;
        textIndex++;
        knownWords.push(word.id);
      }
    }
    //den Buttons die entsprechenden Funktionen zuteilen
    for (let num of knownIDs) {
      var submit = document.getElementById(num.toString()) as HTMLButtonElement;
      if (submit != null) {
        submit.addEventListener('click', (e: Event) => {
          this.assignValue(MapID.get(num)[0], MapID.get(num)[1], MapID.get(num)[2], [(MapID.get(num)[3])], [(MapID.get(num)[4])]);
          //this.focusButton(num.toString());
          this.makeText();
          // this.highlightButton(num.toString());
        });

      }
    }
    for (let w of Array.from(textID.keys())) {
      var btn = document.getElementById(w);
      btn.addEventListener("click", (e: Event) => {
        this.setTextVariable(textID.get(w)[0], w, textID.get(w)[1]);
      });
    }
  }



  setTextVariable(keyword: Keyword, btnID: string, index: number) {
    var inp = prompt("Wert eingeben für: " + keyword.synonym + ", " + keyword.textBefore[index] + "..." + keyword.textAfter[index] + " (" + keyword.variableKind1D[index] + ")");
    this.assignValue(keyword.category, keyword.kind, keyword.name, [inp], [keyword.variableKind1D[index]]);
    var btn = document.getElementById(btnID);
    //btn.innerHTML = "&nbsp<u>"+ inp + "</u>&nbsp";
    this.makeText();
  }






  highlightButton(id: string): void {

    var res = document.getElementById(id) as HTMLButtonElement;
    /*if (res.style.background === "lightgreen") {
      res.style.background = "none";
    }
    else {*/
    res.style.background = "lightgreen";
    //  }

  }

  findFreeText(keyword: Keyword, input: string): void {
    let inpArray: string[] = new Array();
    let splitter: string[] = new Array();

    for (var i = 0; i < keyword.variableKind1D.length; i++) {
      if (keyword.variableKind1D[i] === "oc" || keyword.variableKind1D[i] === "mc") {
        for (var j = 0; j < keyword.variables3D[i].length; j++) {
          splitter = splitter.concat(keyword.variables3D[i][j]);
        }
      }
      else {
        splitter = splitter.concat(keyword.textBefore[i].trim());
        splitter = splitter.concat(keyword.textAfter[i].trim());
      }
    }
    splitter = splitter.concat(input.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g));

    inpArray = this.splitMulti(input, splitter);
    for (var s of inpArray) {
      let arr: string[] = s.split(" ");
      arr = this.deleteEmptyFields(arr);

      if (arr.length >= 3) {
        this.highlight(s, "#87CEEB");

        if (keyword.kind.valueOf() === "group") {
          console.log("in func " + keyword.id);
          let gr: M.Option = D.createDummyGroup(this.parts, keyword.id, keyword.name);
          gr.text += s;
          this.resetTexts.set(gr, s);
        }
        else if (keyword.kind.valueOf() === "box") {
          console.log(keyword.name);
          let gr: M.CheckBox = D.createDummyBox(this.parts, keyword.name);
          gr.text += s;
          this.resetTexts.set(gr, s);
        }
      }
    }
  }


  findDate(input: string) {
    for (var w of this.foundKeywords) {
      if (w.synonym.includes("variabel")) {
        var arr = w.synonym.split(/(variabel)/g)
        var resString = "";
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] != "variabel") {
            resString += arr[i];
          }
          else {
            resString += "\\d{1,2}([\\/.-])\\d{1,2}\\1\\d{4}";
          }
        }
        var regex = new RegExp(resString);
        var res = input.match(regex);
        if (res != undefined) {
          var dates = res[0].toString();
          this.highlight(dates, "lightgreen");
          console.log(dates);
          var param = dates.match(/\d{1,2}([./-])\d{1,2}\1\d{4}/g);
          var numDate = new Array<string>();
          for (const i of param) {
            numDate.push("date");
          }
          this.assignValue(w.category, w.kind, w.name, param, numDate);
          this.makeText();
        }
      }
    }
  }



  findVariables(input: string, reducedInput: string[]) {
    var leftIndex = 0, rightIndex = 1;
    //wenn erstes oder letztes Wort im Input Keywords sind, müssen Stopper eingefügt werden, damit das mit dem links und rechts funktioniert
    if (this.foundKeywords[0].position === 0) {
      reducedInput.unshift("");
    }
    if ((input.length - (this.foundKeywords[this.foundKeywords.length - 1].synonym.length + this.foundKeywords[this.foundKeywords.length - 1].position) === 0)) {
      reducedInput.push("");
    }
    //hier Variablen zu Keywords zuordnen
    for (var i = 0; i < this.foundKeywords.length; i++) {
      let currentKeyword: Keyword = this.foundKeywords[i];
      console.log(currentKeyword);
      this.findFreeText(currentKeyword, reducedInput[rightIndex]);
      if (currentKeyword.variables2D.length != 0) {
        //nach jedem potentiellen Keyword suchen...
        var foundVar: boolean = false;
        for (var j = 0; j < currentKeyword.variables3D.length; j++) {
          if (j - 1 >= 0) {
            if (!foundVar) {
              currentKeyword.foundVariables.push(null);
            }
          }
          foundVar = false;
          for (var k = 0; k < currentKeyword.variables3D[j].length; k++) {
            var breakOuter: boolean = false;
            //hier alle Synonyme von einem KeywordVariable durchgehen
            for (var l = 0; l < currentKeyword.variables3D[j][k].length; l++) {
              //rechts vom Keyword
              if ((currentKeyword.variableKind1D[j] === "oc" || currentKeyword.variableKind1D[j] === "mc") && reducedInput[rightIndex].includes(currentKeyword.variables3D[j][k][l])) {
                currentKeyword.foundVariables.push(currentKeyword.variables2D[j][k]);
                this.highlight(currentKeyword.variables3D[j][k][l], "lightgreen");
                reducedInput[rightIndex] = reducedInput[rightIndex].replace(currentKeyword.variables3D[j][k][l], '');
                breakOuter = true;
                foundVar = true;
                this.highlightButton(currentKeyword.buttons2D[j][k]);
                break;
              }
              else if ((currentKeyword.variableKind1D[j] === "text" || currentKeyword.variableKind1D[j] === "number" || (currentKeyword.variableKind1D[j] === "ratio")) && reducedInput[rightIndex].includes(currentKeyword.textBefore[j])) {
                let nextSplitter = Number.MAX_SAFE_INTEGER;
                let str = reducedInput[rightIndex].substring(reducedInput[rightIndex].lastIndexOf(currentKeyword.textBefore[j]) + currentKeyword.textBefore[j].length, reducedInput[rightIndex].length);
                let splitter: string[];
                splitter = [].concat(...currentKeyword.variables3D).filter(word => word != "" && word != " ");
                splitter = splitter.concat(currentKeyword.textBefore).filter(word => word != currentKeyword.textBefore[j] && word != undefined);
                for (var l = 1; l < splitter.length; l++) {
                  var ind = str.indexOf(splitter[l]);
                  if (ind != -1 && ind < nextSplitter) {
                    nextSplitter = ind;
                  }
                }
                if (currentKeyword.textAfter[j] != undefined && currentKeyword.textAfter[j].replace(/\s/g, '').length != 0) {
                  if (str.indexOf(currentKeyword.textAfter[j]) < nextSplitter && str.indexOf(currentKeyword.textAfter[j]) != -1) {
                    nextSplitter = str.indexOf(currentKeyword.textAfter[j]);
                  }
                }
                currentKeyword.foundVariables.push(str.substring(0, nextSplitter));
                foundVar = true;
                breakOuter = true;
                break;
              }
            }
            if (breakOuter && currentKeyword.variableKind1D[j] != "mc") {
              break;
            }
          }
        }
        //komplett, teilweise komplett oder keine Variablen?
        let countVariables = this.countCompleteVariables(currentKeyword);
        if (countVariables === currentKeyword.variables2D.length) {
          this.completeKeywords.set(currentKeyword.synonym, currentKeyword.foundVariables);
        }
        else if (countVariables === 0) {
          this.incompleteKeywords.push(currentKeyword.synonym);
        }
        else {
          this.partialCompleteKeywords.set(currentKeyword.synonym, currentKeyword.foundVariables);
        }
        console.log(currentKeyword.category + "" + currentKeyword.kind + "" + currentKeyword.name + "" + currentKeyword.foundVariables + "" + currentKeyword.variableKind1D);
        this.assignValue(currentKeyword.category, currentKeyword.kind, currentKeyword.name, currentKeyword.foundVariables, currentKeyword.variableKind1D);
      }
      //ansonsten Keyword ohne Variablen assignen
      else {
        //Keywords ohne Variablen sind automatisch auch vollständig
        this.completeKeywords.set(currentKeyword.synonym, []);
        this.assignValue(currentKeyword.category, currentKeyword.kind, currentKeyword.name);
      }
      leftIndex++;
      rightIndex++;
    }
  }




  countCompleteVariables(keyword: Keyword): number {
    let result: number = 0;
    for (var i = 0; i < keyword.foundVariables.length; i++) {
      if (keyword.foundVariables[i] != null || keyword.foundVariables[i] != undefined) {
        result++;
      }
    }
    return result;
  }


  creatNormalKeyword(input: string[]) {
    for (let inp of input) {
      let restNormal: Keyword = new Keyword("Rest", "Rest", "Rest");
      restNormal.synonym = inp;
      this.keywords.push(restNormal);
    }
  }

  makeGreyCategory(markGrey: string): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        if (p.name.startsWith(markGrey)) {
          document.getElementById(p.name).classList.remove("category");
          document.getElementById(p.name).classList.add("grey");
          p.name = p.name.substring(1, p.name.length);
        }
      }
    }
  }



  readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          alert(allText);
        }
      }
    }
    rawFile.send(null);
  }


  init(): void {
    let restNormalSynonyms = ["Rest normal", "Rest ist normal"];
    this.keywords = D.createDic(this.parts);
    this.makeGreyCategory("<");
    this.creatNormalKeyword(restNormalSynonyms);
    for (const k of this.keywords) {
      this.DictionaryPrimary.push(k.synonym);
    }
    this.setKeywordButtons();
    let btn = document.getElementById("los") as HTMLButtonElement;
    //  btn.disabled = true;

  }




  submit(): void {
    let resetText = Array.from(this.resetTexts.keys());
    for (let res of resetText) {
      let val: string = this.resetTexts.get(res);
      res.text = res.text.replace(val, "");
    }

    D.resetValue(this.parts);
    this.makeText();
    let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    let inputWithoutKeywords = new Array<string>();
    //das ist ein Reset
    this.completeKeywords.clear();
    this.partialCompleteKeywords.clear();
    this.incompleteKeywords.splice(0, this.incompleteKeywords.length);

    document.getElementById('inputText').innerHTML = input;
    input = this.autocorrect(input);
    //input = document.getElementById('inputText').innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    //das Wörterbuch soll nur einmal erstellt werden; in foundKeywords sind nur die Wörter drin, die im Input auch gefunden werden
    this.foundKeywords.splice(0, this.foundKeywords.length);
    this.foundKeywords = JSON.parse(JSON.stringify(this.keywords));


    //Idee: erst nach allen Keywords trennen, damit splitted Array keine primären Keywords mehr enthält. 
    //Dann Reihenfolge der vorhandenen Keywords erstellen aufgrund ihrer Position im ursprünglichen String
    //Dann schaut man für jedes Keyword im Bereich vor und nach dem Keyword nach möglichen Variablen
    inputWithoutKeywords = this.splitMulti(input, this.DictionaryPrimary);
    inputWithoutKeywords = this.deleteEmptyFields(inputWithoutKeywords); //weil für Keywords immer leere Felder eingefügt werden

    this.findDate(input);
    this.sortKeywords(input);
    this.findVariables(input, inputWithoutKeywords);
    this.makeDebugColors();
    this.makeText();
  }

  autocorrect(inputString): string {
    let result = inputString;
    let words = new Set<string>();
    for (const w of this.DictionaryPrimary) {
      let temp = w.split(" ");
      for (const t of temp) {
        words.add(t)
      }
    }
    let wordsArray: string[] = Array.from(words);
    let inp = document.getElementById('inputText').innerHTML;
    let inpA = inp.split(" ");
    for (const t of inpA) {
      if (t.length >= 5 && t.length < 8) {
        let temp = new Array();
        for (const w of wordsArray) {
          if (D.levenshtein(t, w) === 1) {
            temp.push(w.trim());
          }
          else if (D.levenshtein(t, w) === 0) {
            temp = [];
            break;
          }
        }
        if (temp.length >= 1) {
          document.getElementById('inputText').innerHTML = document.getElementById('inputText').innerHTML.replace(t, "<u _ngcontent-c1><a _ngcontent-c1 class=info>" + t + " <span _ngcontent-c1>" + temp + "</span></a></u>");
          result = inputString.replace(t, temp[0]);
        }
      }
      else if (t.length >= 9) {
        let temp = new Array();
        for (const w of wordsArray) {
          if (D.levenshtein(t, w) === 1 || D.levenshtein(t, w) === 2) {
            temp.push(w.trim());
          }
          else if (D.levenshtein(t, w) === 0) {
            temp = [];
            break;
          }
        }
        if (temp.length >= 1) {
          result = inputString.replace(t, temp[0]);
          document.getElementById('inputText').innerHTML = document.getElementById('inputText').innerHTML.replace(t, "<u _ngcontent-c1><a _ngcontent-c1 class=info>" + t + " <span _ngcontent-c1>" + temp + "</span></a></u>");
        }
      }
    }
    return result;
  }



  makeDebugColors(): void {
    let keysTest = Array.from(this.completeKeywords.keys());
    for (var i = 0; i < keysTest.length; i++) {
      this.highlight(keysTest[i], "#01DF01");
    }
    keysTest = Array.from(this.partialCompleteKeywords.keys());
    for (var i = 0; i < keysTest.length; i++) {
      this.highlight(keysTest[i], "#F4FA58");
    }
    for (var i = 0; i < this.incompleteKeywords.length; i++) {
      this.highlight(this.incompleteKeywords[i], "#F97457");
    }
  }

  assignValue(category: string, kind: string, name: string, variable?: string[], variableKind?: string[]): void {
    if (category.startsWith("<")) {
      category = category.substring(1, category.length);
    }
    if (category === "Rest") {
      this.makeNormal();
    }
    else {
      console.log(category + " " + kind + " " + name + " " + variable + " " + variableKind);
      for (const p of this.parts) {
        if (p.kind === "category") {
          if (p.name === category) {
            for (const s of p.selectables) {
              if (kind === "group" && s.kind === "group") {
                for (const o of s.options) {
                  if (o.name === name) {
                    //o.normal = true;
                    s.value = o.name;
                    console.log(o.variables);
                    let variableIndex: number = 0; //damit die richtige Variable dem richtigen Index zugeordnet wird
                    for (var i = 0; i < o.variables.length; i++) {
                      if (variable[variableIndex] != undefined) {
                        for (const v of o.variables) {
                          if (v.kind === "oc" && variableKind[variableIndex] === "oc" && v.values.includes(variable[variableIndex])) {
                            v.value = variable[variableIndex];
                            variableIndex++;
                          }
                          else if (v.kind === "mc" && variableKind[variableIndex] === "mc" && this.exists2D(v.values, variable[variableIndex])) {
                            for (const va of v.values) {
                              if ((va[0] === variable[variableIndex]))
                                va[1] = true;
                              variableIndex++;
                            }
                          }
                          else if (v.kind === "text" && variableKind[variableIndex] === "text") {
                            console.log(v.value);
                            v.value = variable[variableIndex];
                            variableIndex++;
                          }
                          else if (v.kind === "number" && variableKind[variableIndex] === "number") {
                            v.value = Number(variable[variableIndex]);
                            variableIndex++;
                          }
                          else if (v.kind === "ratio" && variableKind[variableIndex] === "ratio") {
                            let res = variable[variableIndex].match(/\d+/g)
                            if (res[0] != undefined && res[1] != undefined) {
                              v.numerator = Number.parseInt(res[0]);
                              v.denominator = Number.parseInt(res[1]);
                            }
                            variableIndex++;
                          }
                          else if (v.kind === "date" && variableKind[variableIndex] === "date") {
                            var date = new Date();
                            v.value = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear() };
                            var split = variable[variableIndex].split(".");
                            v.value.day = +split[0];
                            v.value.month = +split[1];
                            v.value.year = +split[2];
                            variableIndex++;
                          }
                        }
                      }
                      else {
                        variableIndex++;
                      }
                    }
                  }
                }
              }
              else if (kind === "box" && s.kind === "box" && s.name === name) {
                s.value = true;
                //s.normal = true;


                let variableIndex: number = 0; //damit die richtige Variable dem richtigen Index zugeordnet wird
                for (var i = 0; i < s.variables.length; i++) {
                  if (variable[variableIndex] != undefined) {
                    let k = s.variables[i];
                    if (k.kind === "oc" && variableKind[variableIndex] === "oc" && k.values.includes(variable[variableIndex])) {
                      k.value = variable[variableIndex];
                      variableIndex++;
                    }
                    else if (k.kind === "mc" && variableKind[variableIndex] === "mc" && this.exists2D(k.values, variable[variableIndex])) {
                      for (const t of k.values) {
                        if (t[0] === variable[variableIndex]) {
                          t[1] = true;
                          variableIndex++;
                        }
                      }
                    }
                    else if (k.kind === "text" && variableKind[variableIndex] === "text") {
                      k.value = variable[variableIndex];
                      variableIndex++;
                    }
                    else if (k.kind === "number" && variableKind[variableIndex] === "number") {
                      k.value = Number(variable[variableIndex]);
                      variableIndex++;
                    }
                    else if (k.kind === "ratio" && variableKind[variableIndex] === "ratio") {
                      let res = variable[variableIndex].match(/\d+/g)
                      if (res != undefined) {
                        if (res.length >= 2) {
                          k.numerator = Number.parseInt(res[0]);
                          k.denominator = Number.parseInt(res[1]);
                        }
                      }
                      variableIndex++;
                    }
                    else if (k.kind === "date" && variableKind[variableIndex] === "date") {
                      var date = new Date();
                      k.value = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear() };
                      var split = variable[variableIndex].split(".");
                      k.value.day = +split[0];
                      k.value.month = +split[1];
                      k.value.year = +split[2];
                      variableIndex++;
                    }
                  }
                  else {
                    variableIndex++;
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  exists2D(arr, search) {
    return arr.some(row => row.includes(search));
  }

  makeText(): void {
    const [suppressedNormal, suppressedJudgement] = G.getSuppressedConditionalIds(this.parts);
    const normalExtractor: M.TextExtractor = G.normalExtractor()
    const judgementExtractor: M.TextExtractor = G.judgementExtractor();

    this.text = G.makeText(this.parts, normalExtractor, suppressedNormal);
    this.judgement = G.makeText(this.parts, judgementExtractor, suppressedJudgement);
  }




  copyText(id: string): void {
    (document.getElementById(id) as HTMLInputElement).select();
    document.execCommand('copy');
  }

  makeNormal(): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        G.makeNormalCategory(p);
      }
    }
    this.makeText();
  }

  clicked(clicked: M.Clickable, parent?: M.Group): void {
    /*if (clicked.kind === "box" && clicked.variables.length > 0 && !clicked.value) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    } else if (clicked.kind === "option" && clicked.variables.length > 0 && parent && parent.value !== clicked.name) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    }*/
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

  reverse(): void {
    const text = (document.getElementById('output1') as HTMLTextAreaElement).value;
    P.take(text, this.parts);
  }

}

