import { Component, OnInit, AfterViewInit, AfterContentInit, HostListener, Input } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as M from '../model'
import * as G from '../generator'
import * as P from '../parser'
import * as T from '../takers'
import { Keyword } from './Keyword';
import * as D from './Dictionary';

//ich hoffe dass das nie jemand debuggen/erweitern muss

declare const $: any;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  ngOnInit(): void {
    $('#my_img').hide();
    $("#imgUpload").hover(
      // show
      function () {
        $('#my_img').show();
      },
      // hide
      function () {
        $('#my_img').hide();
      });
    setTimeout(function () {
      document.getElementById('los').click();
      // document.getElementById('los').style.visibility = 'hidden';
    }, 50);
  }


  text: string = "";
  judgement: string = "";
  modalVariables: M.Variable[] = [];
  input: string = "";
  DictionaryPrimary: string[] = new Array<string>();
  keywords: Keyword[] = new Array<Keyword>();
  foundKeywords: Keyword[] = new Array<Keyword>();
  parts: M.TopLevel[] = [];
  matches: string[] = new Array();
  foundDateRegex: RegExp[] = new Array();
  //defValues:  = new Array ();
  //default values
  defBox: M.Selectable[] = new Array();
  defGroup: M.Selectable[] = new Array();


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
          },
          error => window.alert("An unknown error occured: " + JSON.stringify(error))
        );
      }
    });
  }


  scroll() {
    var ele = document.getElementById('main-content');
    console.log(ele.offsetHeight);
    console.log(ele.scrollTop);
    console.log(ele.clientHeight);
    if (ele.scrollTop < 70) {
      console.log("1");
      ele.scrollTo(0, document.body.scrollHeight);
    }
    else {
      console.log("2");
      ele.scrollTop = 0;
    }
  }

  refreshPage() {
    window.location.reload();
  }


  splitMulti(str, tokens) {
    var tempChar = tokens[0];
    if (tempChar != undefined) {
      tempChar = tempChar.toLowerCase();
    }
    str = str.toLowerCase();
    for (var i = 1; i < tokens.length; i++) {
      if (tokens[i] != undefined) {
        str = str.split(tokens[i].toLowerCase()).join(tempChar);
      }
    }
    console.log(str);
    str = str.split(tempChar);
    console.log(str);
    return str;
  }

  splitMultiSpecial(str, tokens) {
    var tempChar = tokens[0];
    if (tempChar != undefined) {
      tempChar = tempChar.toLowerCase();
    }
    str = str.toLowerCase();
    for (var i = 1; i < tokens.length; i++) {
      if (tokens[i] != undefined) {
        str = str.split(tokens[i].toLowerCase()).join(tempChar);
      }
    }
    var regex = new RegExp(tempChar + "" + tempChar, "gi");
    str = str.replace(regex, tempChar + " " + tempChar);
    str = str.split(tempChar);
    return str;
  }

  matchMulti(str: string, tokens) {
    var tempChar = tokens[0];
    if (tempChar != undefined) {
      tempChar = tempChar.toLowerCase();
    }
    str = str.toLowerCase();
    for (var i = 1; i < tokens.length; i++) {
      if (tokens[i] != undefined) {
        str = str.split(tokens[i].toLowerCase()).join(tempChar);
        console.log(str);
      }
    }
    console.log(str);
    var reg = new RegExp("(" + tempChar + ")", "g");
    var strArr: string[] = str.split(reg);
    strArr = this.deleteEmptyFields(strArr);
    var index = 0;
    for (var s = 0; s < strArr.length; s++) {
      if (strArr[s] === tempChar) {
        strArr[s] = this.foundKeywords[index].synonym;
        index++;
      }
    }
    console.log(strArr);
    return strArr;
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

  getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  sortKeywords(input: string): void {
    let addKeywords: Keyword[] = new Array();
    //welche Keywords kommen im input vor?
    for (var i = 0; i < this.foundKeywords.length; i++) {
      var positions: number[] = this.getIndicesOf(this.foundKeywords[i].synonym, input, false);
      if (positions.length >= 1) {
        this.foundKeywords[i].position = positions[0];
        for (var j = 1; j < positions.length; j++) {
          let word: Keyword = JSON.parse(JSON.stringify(this.foundKeywords[i]));
          word.position = positions[j];
          addKeywords.push(word);
        }
      }
      else {
        this.foundKeywords.splice(i, 1);
        i--;
      }
    }
    this.foundKeywords = this.foundKeywords.concat(addKeywords);
    for (var k of this.foundKeywords) {
      if (k.overlap.length > 0) {
        for (var o of k.overlap) {
          var ind = k.synonym.toLowerCase().indexOf(o.synonym.toLowerCase());
          var overlapKeyword = this.foundKeywords.find(x => x.position === k.position + ind);
          this.foundKeywords.splice(this.foundKeywords.indexOf(overlapKeyword), 1);
        }
      }
    }
    this.foundKeywords.sort(this.compareKeywords);
  }

  highlightByIndex(text: string, colorCode: string, index: number) {
    var regex = new RegExp("(" + text + ")(?!([^<]+)?>)", "gi");
    this.matches[index] = this.matches[index].replace(regex, "<span style=\"background-color: " + colorCode + "\">" + text + "</span>");
  }


  setKeywordButtons() {
    let counter = 0;
    let knownWords: Array<string> = new Array<string>();
    let knownIDs: Array<number> = new Array<number>();
    let MapID = new Map<number, string[]>();
    let textID = new Map<string, [Keyword, number]>();

    let textIndex: number = 0;
    for (const word of this.keywords) {
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
          this.checkActive();
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
    let kind: string[] = new Array();
    let inpArr: string[] = new Array();
    for (var i = 0; i < index; i++) {
      var curr = keyword.variableKind1D[i];
      if (curr === "text" || curr === "date" || curr === "ratio") {
        inpArr.push('');
      }
    }
    for (var j = 0; j < keyword.variableKind1D.length; j++) {
      var curr = keyword.variableKind1D[j];
      if (curr === "text" || curr === "date" || curr === "ratio") {
        kind.push(keyword.variableKind1D[j]);
      }
    }
    //kind.push(keyword.variableKind1D[index]);
    inpArr.push(inp);
    this.assignValue(keyword.category, keyword.kind, keyword.name, inpArr, kind);
    var btn = document.getElementById(btnID);
    // this.highlightButton(btnID);
    //btn.innerHTML = "&nbsp<u>"+ inp + "</u>&nbsp";
    this.makeText();
  }






  highlightButton(id: string, reset?: boolean): void {
    var res = document.getElementById(id) as HTMLButtonElement;
    /*if (res.style.background === "lightgreen") {
      res.style.background = "none";
    }
    else {*/
    if (reset != undefined) {
      res.style.background = "none";
    }
    else {
      res.style.background = "lightgreen";
    }
    //  }

  }

  findFreeText(keyword: Keyword, input: string, index: number): void {
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
    //splitter = splitter.concat(input.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g));
    for (var r of this.foundDateRegex) {
      splitter = splitter.concat(input.match(r));
    }
    if (splitter != null) {
    //  splitter = splitter.filter(entry => /\S/.test(entry));
    }
    //
    inpArray = this.splitMulti(input, splitter);
    for (var s of inpArray) {
      let arr: string[] = s.split(" ");
      arr = this.deleteEmptyFields(arr);
      if (arr.length >= 3) {
        this.highlightByIndex(s, "#87CEEB", index);
        if (keyword.kind.valueOf() === "group") {
          let gr: M.Option = D.createDummyGroup(this.parts, keyword.id, keyword.name);
          s = s.trim();
          s = s.charAt(0).toUpperCase() + s.slice(1);
          gr.text += s;
          this.resetTexts.set(gr, s);
        }
        else if (keyword.kind.valueOf() === "box") {
          let gr: M.CheckBox = D.createDummyBox(this.parts, keyword.name);
          s = s.trim();
          s = s.charAt(0).toUpperCase() + s.slice(1);
          gr.text += s;
          this.resetTexts.set(gr, s);
        }
      }
    }
  }


  findDate(input: string) {
    this.foundDateRegex = [];
    for (var w of this.foundKeywords) {
      if (w.synonym.includes("variabel")) {
        console.log(w.synonym);
        var arr = w.synonym.toLowerCase().split(/(variabel)/g)
        var resString = "";
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] != "variabel") {
            resString += arr[i];
          }
          else {
            resString += "\\d{1,2}([\\/.-])\\d{1,2}\\1\\d{4}";
          }
        }
        var regex = new RegExp(resString, "gi");
        var res = input.toLowerCase().match(regex);
        if (res != undefined) {
          this.foundDateRegex.push(regex);
          var dates = res[0].toString();
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

  arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
  }

  matchesFixup() {

    var syns: string[] = new Array();
    for (var s of this.foundKeywords) {
      syns.push(s.synonym);
    }
    for (var m = 0; m < this.matches.length - 1; m++) {
      if (this.arrayContains(this.matches[m], syns)) {
        if (this.arrayContains(this.matches[m + 1], syns)) {
          this.matches.splice(m + 1, 0, " ");
        }
      }
    }
  }

  findVariables(input: string, reducedInput: string[]) {
    var rightIndex = 1;
    console.log(this.foundKeywords);
    //wenn erstes oder letztes Wort im Input Keywords sind, müssen Stopper eingefügt werden, damit das mit dem links und rechts funktioniert
    if (this.foundKeywords[0].position === 0) {
      reducedInput.unshift("");
    }
    if ((input.length - (this.foundKeywords[this.foundKeywords.length - 1].synonym.length + this.foundKeywords[this.foundKeywords.length - 1].position) === 0)) {
      reducedInput.push("");
    }

    //wenn erster Eintrag in matches kein Keyword ist->löschen, damit Index mit reducedInput übereinstimmt
    if (!this.matches[0].includes(this.foundKeywords[0].synonym)) {
      this.matches.shift()
    }
    this.matchesFixup();

    console.log(this.foundKeywords);
    //hier Variablen zu Keywords zuordnen
    for (var i = 0; i < this.foundKeywords.length; i++) {
      var numberFoundVars = 0;
      let currentKeyword: Keyword = this.foundKeywords[i];
      this.findFreeText(currentKeyword, reducedInput[rightIndex], (i * 2) + 1);
      //Date finden und highlighten
      for (var fdate of this.foundDateRegex) {
        if (this.matches[(i * 2) + 1] != undefined) {
          var dateString = this.matches[(i * 2) + 1].match(fdate);
          if (dateString != undefined) {
            this.matches[(i * 2) + 1] = this.matches[(i * 2) + 1].replace(fdate, "<span style=\"background-color: #01DF01 \">" + dateString + "</span>");
          }
        }
      }
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
              if ((currentKeyword.variableKind1D[j] === "oc" || currentKeyword.variableKind1D[j] === "mc") && reducedInput[rightIndex].includes(currentKeyword.variables3D[j][k][l].toLowerCase())) {
                currentKeyword.foundVariables.push(currentKeyword.variables2D[j][k]);
                var removeBrackets = currentKeyword.textBefore[j].replace(/\[.*?\]/g,"[]");
                var splitBefore = removeBrackets.split("[]")[0];
                var splitAfter = removeBrackets.split("[]")[1];
                if(splitBefore && !/^\s*$/.test(splitBefore))
                {
                  this.highlightByIndex(splitBefore, "#cc9900", (i * 2) + 1);
                }
                if(splitAfter && !/^\s*$/.test(splitAfter))
                {
                  this.highlightByIndex(splitAfter, "#cc9900", (i * 2) + 1);
                }
                console.log(removeBrackets);

                this.highlightByIndex(currentKeyword.variables3D[j][k][l], "lightgreen", (i * 2) + 1);
                breakOuter = true;
                foundVar = true;
                numberFoundVars++;
                break;
              }
              else if ((currentKeyword.variableKind1D[j] === "text" || currentKeyword.variableKind1D[j] === "number" || (currentKeyword.variableKind1D[j] === "ratio")) && reducedInput[rightIndex].includes(currentKeyword.textBefore[j].toLowerCase())) {
                let nextSplitter = Number.MAX_SAFE_INTEGER;
                let str = reducedInput[rightIndex].substring(reducedInput[rightIndex].lastIndexOf(currentKeyword.textBefore[j].toLowerCase()) + currentKeyword.textBefore[j].length, reducedInput[rightIndex].length);
                let splitter: string[];
                splitter = [].concat(...currentKeyword.variables3D).filter(word => word != "" && word != " ");
                splitter = splitter.concat(currentKeyword.textBefore).filter(word => word != currentKeyword.textBefore[j] && word != undefined);
                for (var a = 0; a < splitter.length; a++) {
                  splitter[a] = splitter[a].toString().toLowerCase();
                }
                for (var l = 0; l < splitter.length; l++) {
                  var ind = str.toLowerCase().indexOf(splitter[l]);
                  if (ind != -1 && ind < nextSplitter) {
                    nextSplitter = ind;
                  }
                }
                if (currentKeyword.textAfter[j] != undefined && currentKeyword.textAfter[j].replace(/\s/g, '').length != 0) {
                  var textAfterIndex = str.toLowerCase().indexOf(currentKeyword.textAfter[j].toLowerCase());
                  if (textAfterIndex < nextSplitter && textAfterIndex != -1) {
                    nextSplitter = textAfterIndex;
                    this.highlightByIndex(currentKeyword.textAfter[j].toLowerCase(), "#cc9900", (i * 2) + 1);
                  }
                }

                var res = str.substring(0, nextSplitter);
                this.highlightByIndex(currentKeyword.textBefore[j].toLowerCase(), "#cc9900", (i * 2) + 1);
                this.highlightByIndex(res, "lightgreen", (i * 2) + 1);
                currentKeyword.foundVariables.push(res);
                foundVar = true;
                breakOuter = true;
                numberFoundVars++;
                break;
              }
            }
            if (breakOuter && currentKeyword.variableKind1D[j] != "mc") {
              break;
            }
          }
        }
        //Farbe des Keywords nach Anzahl der gefunden Variablen festlegen
        if (numberFoundVars === currentKeyword.variables2D.length) {
          this.highlightByIndex(currentKeyword.synonym, "#01DF01", (i * 2));
        }
        else if (numberFoundVars === 0) {
          this.highlightByIndex(currentKeyword.synonym, "#e65c00", (i * 2));
        }
        else {
          this.highlightByIndex(currentKeyword.synonym, "yellow", (i * 2));
        }
        console.log(currentKeyword.category + "" + currentKeyword.kind + "" + currentKeyword.name + "" + currentKeyword.foundVariables + "" + currentKeyword.variableKind1D);
        this.assignValue(currentKeyword.category, currentKeyword.kind, currentKeyword.name, currentKeyword.foundVariables, currentKeyword.variableKind1D);
      }
      //ansonsten Keyword ohne Variablen assignen
      else {
        //Keywords ohne Variablen sind automatisch auch vollständig
        this.highlightByIndex(currentKeyword.synonym, "#01DF01", (i * 2));
        this.assignValue(currentKeyword.category, currentKeyword.kind, currentKeyword.name);
      }
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
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          alert(allText);
        }
      }
    }
    rawFile.send(null);
  }


  resizeColumns(input: string) {
    let numbers = input.split(",");
    //text links wird resiszt
    /*let textLeft = document.getElementsByClassName('main') as HTMLCollectionOf<HTMLElement>;
    if (numbers.length > 0) {
      let wid = Number.parseInt(numbers[0]) * 3.7795275591;
      textLeft[0].style.columns = wid.toString() + "px 1fr";
    }*/
    let textLeft = document.getElementById("output1");
    //textLeft.style.width = "100px";
    //Kategorien werden resiszt
    let categoryWid = document.getElementsByClassName("category") as HTMLCollectionOf<HTMLElement>;
    if (categoryWid.length != 0) {
      var wid = Number.parseInt(numbers[1]) * 3.7795275591;
      categoryWid[0].style.maxWidth = wid.toString() + "px";
    }
    /*for (var i = 0; i < categoryWid.length; i++) {
      categoryWid[i].style.maxWidth = (Number.parseInt(numbers[1]) * 3.7795275591).toString();
    }*/
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
    for (var i: number = numbers.length; i < 20; i++) {
      var transNum = (i * 2) - 1;
      var testStyle = document.createElement('style');
      testStyle.type = 'text/css';
      testStyle.innerHTML = 'tbody>tr>:nth-child(' + transNum + ') { max-width: ' + 6000 + 'px;}';
      document.getElementsByTagName('head')[0].appendChild(testStyle);
    }
  }



  readConfig() {
    let konfig = document.getElementById("Konfigurierung");
    konfig.parentNode.removeChild(konfig);
    let remove = document.getElementById("Spaltenbreite");
    remove.parentNode.removeChild(remove);
    remove = document.getElementById("Spaltenbreitebox");
    remove.parentNode.removeChild(remove);
    remove = document.getElementById("BildUpload");
    remove.parentNode.removeChild(remove);
    remove = document.getElementById("BildUploadbox");
    remove.parentNode.removeChild(remove);
    var test = this.keywords.find(x => x.name === "Spaltenbreite");
    this.resizeColumns(test.synonym);
    var bild = this.keywords.find(x => x.name === "BildUpload");
    var fileTag = document.getElementById("imgUpload"),
      preview = document.getElementById("my_img");
    if (bild.synonym.toLowerCase() != "ja") {
      fileTag.style.visibility = "hidden";
      preview.style.visibility = "hidden";
    }

    fileTag.addEventListener("change", function () {
      changeImage(this);
    });
    function changeImage(input) {
      var reader;
      console.log("asd");
      if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
          preview.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    var captions = Array.from(document.getElementsByName("test"));
    for (var cap of captions) {
      if (cap.innerText === "<>") {
        cap.style.visibility = "hidden";
      }
    }

    var last;
    for (var i = 0; i < this.parts.length; i++) {
      var curr = this.parts[i];
      if (curr.kind === "category") {
        if (curr.name === ">" && last != undefined) {
          var j = i;
          var stop = false;
          var arr = new Array();
          var ele = new Array();
          arr.push(last);
          ele = ele.concat((last as M.Category).selectables);
          while (j < this.parts.length && !stop) {
            var currJ = this.parts[j];
            if (currJ.kind === "category") {
              if (currJ.name === ">") {
                arr.push(currJ);
                ele = ele.concat(currJ.selectables);
                j++;
              }
              else {
                stop = true;
              }
            }
            else {
              j++;
            }
          }
          for (var v of arr) {
            (v as M.Category).selectablesNormal = ele;
          }
          i = j - 1;
        }
        else {
          curr.selectablesNormal = curr.selectables;
          last = curr;
        }
      }
    }
  }


  init(): void {
    let restNormalSynonyms = ["Rest normal", "Rest ist normal"];
    this.keywords = D.createDic(this.parts);
    this.makeGreyCategory("<");
    this.creatNormalKeyword(restNormalSynonyms);
    for (const k of this.keywords) {
      this.DictionaryPrimary.push(k.synonym);
    }
    this.getDefault();
    this.setKeywordButtons();
    this.readConfig();
  }

  getDefault() {
    var cat = this.parts.filter(x => x.kind === "category");
    for (var d of cat) {
      this.defBox = this.defBox.concat((d as M.Category).selectables.filter(x => x.kind === "box" && x.value === true));
      //this.defGroup = this.defGroup.concat((d as M.Category).selectables.filter(x => x.kind === "group" && x.value != "" && x.value != null));
    }
  }

  setDefault() {
    for (var b of this.defBox) {
      (b as M.CheckBox).value = true;
    }
  }

  submit(): void {
    let resetText = Array.from(this.resetTexts.keys());
    for (let res of resetText) {
      let val: string = this.resetTexts.get(res);
      res.text = res.text.replace(val, "");
    }
    this.matches = [];
    D.resetValue(this.parts);
    this.setDefault();
    this.makeText();

    let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    let inputWithoutKeywords = new Array<string>();
    document.getElementById('inputText').innerHTML = input;
    input = this.autocorrect(input);

    //das Wörterbuch soll nur einmal erstellt werden; in foundKeywords sind nur die Wörter drin, die im Input auch gefunden werden
    this.foundKeywords.splice(0, this.foundKeywords.length);
    this.foundKeywords = JSON.parse(JSON.stringify(this.keywords));
    //Idee: erst nach allen Keywords trennen, damit splitted Array keine primären Keywords mehr enthält. 
    //Dann Reihenfolge der vorhandenen Keywords erstellen aufgrund ihrer Position im ursprünglichen String
    //Dann schaut man für jedes Keyword im Bereich vor und nach dem Keyword nach möglichen Variablen
    this.findDate(input);
    this.sortKeywords(input);
    var keyWordSyn = new Array();
    console.log(this.foundKeywords);
    for (var k of this.foundKeywords) {
      keyWordSyn.push(k.synonym);
    }
    this.matches = this.matchMulti(input, keyWordSyn);
    console.log(this.matches);
    inputWithoutKeywords = this.splitMultiSpecial(input, keyWordSyn);
    inputWithoutKeywords = this.deleteEmptyFields(inputWithoutKeywords); //weil für Keywords immer leere Felder eingefügt werden
    console.log(inputWithoutKeywords);
    this.findVariables(input, inputWithoutKeywords);
    this.checkActive();
    this.makeText();
    document.getElementById('inputText').innerHTML = this.matches.join("");
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
          if (D.levenshtein(t.toLowerCase(), w.toLowerCase()) === 1) {
            temp.push(w.trim());
          }
          else if (D.levenshtein(t.toLowerCase(), w.toLowerCase()) === 0) {
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
          if (D.levenshtein(t.toLowerCase(), w.toLowerCase()) === 1 || D.levenshtein(t.toLowerCase(), w.toLowerCase()) === 2) {
            temp.push(w.trim());
          }
          else if (D.levenshtein(t.toLowerCase(), w.toLowerCase()) === 0) {
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


  getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
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
                            if (variable[variableIndex] != "") {
                              v.value = variable[variableIndex];
                            }
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
                            if (variable[variableIndex] != "") {
                              v.value = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear() };
                              var split = variable[variableIndex].split(".");
                              v.value.day = +split[0];
                              v.value.month = +split[1];
                              v.value.year = +split[2];
                            }
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
                      if (variable[variableIndex] != "") {
                        k.value = variable[variableIndex];
                      }
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
                      if (variable[variableIndex] != "") {
                        k.value = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear() };
                        var split = variable[variableIndex].split(".");
                        k.value.day = +split[0];
                        k.value.month = +split[1];
                        k.value.year = +split[2];
                      }
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


  checkActive() {
    for (const p of this.parts) {
      if (p.kind === "category") {
        for (const s of p.selectables) {
          if (s.kind === "group") {
            for (const o of s.options) {
              let keyw: Keyword = this.keywords.find(x => x.category === p.name && x.name === o.name);
              if (keyw === undefined) {
                keyw = this.keywords.find(x => x.category.substring(1, x.category.length) === p.name && x.name === o.name);
              }
              for (const v of o.variables) {
                if (v.kind === "oc") {
                  for (var va of v.values) {
                    let lol = this.getIndexOfK(keyw.variables2D, va)
                    if (v.value === va && s.value === keyw.name) {
                      this.highlightButton(keyw.buttons2D[lol[0]][lol[1]]);
                    }
                    else {
                      this.highlightButton(keyw.buttons2D[lol[0]][lol[1]], true);
                    }
                  }
                }
                else if (v.kind === "mc") {
                  for (const va of v.values) {
                    let lol = this.getIndexOfK(keyw.variables2D, va[0])
                    if (va[1] === true && s.value != "" && s.value != undefined) {
                      this.highlightButton(keyw.buttons2D[lol[0]][lol[1]]);
                    }
                    else {
                      this.highlightButton(keyw.buttons2D[lol[0]][lol[1]], true);
                    }
                  }
                }
              }
            }
          }
          else if (s.kind === "box") {
            for (const v of s.variables) {
              let keyw: Keyword = this.keywords.find(x => x.name === s.name && x.kind === s.kind);
              if (v.kind === "oc") {
                for (var va of v.values) {
                  let lol = this.getIndexOfK(keyw.variables2D, va)
                  if (v.value === va && s.value === true) {
                    this.highlightButton(keyw.buttons2D[lol[0]][lol[1]]);
                  }
                  else {
                    this.highlightButton(keyw.buttons2D[lol[0]][lol[1]], true);
                  }
                }
              }
              else if (v.kind === "mc") {
                for (const va of v.values) {
                  let lol = this.getIndexOfK(keyw.variables2D, va[0])
                  if (va[1] === true && s.value === true) {
                    this.highlightButton(keyw.buttons2D[lol[0]][lol[1]]);
                  }
                  else {
                    this.highlightButton(keyw.buttons2D[lol[0]][lol[1]], true);
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
    setTimeout(() => this.checkActive(), 0);
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

