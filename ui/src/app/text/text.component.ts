import { Component, OnInit, AfterViewInit, AfterContentInit, HostListener, Input } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as M from '../model'
import * as G from '../generator'
import * as P from '../parser'
import * as T from '../takers'
import { Keyword, Keyword2, Category, Disease } from './Keyword';
import * as D from './Dictionary';
import { InputParserService } from '../input-parser.service';
import { TextOutputService } from '../text-output.service';

//ich hoffe dass das nie jemand debuggen/erweitern muss

declare const $: any;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  // used that only one synonym for each keyword is shown on the interface
  filterSyn(arr: Array<Keyword2>){
    return arr.filter(key => key.name == key.synonym);
  }



  ngOnInit(): void {
    // assigns reference to polyp object
    //this.polyp = this.inputParser.polyp;
    this.diseases = this.inputParser.diseases;

    this.firstTime = false;
    this.start = false;
    this.myInput = this.inputParser.twInput;
    //this.recogWords = this.textOut.recogWords;
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
     /* setTimeout(function () {

      // document.getElementById('los').style.visibility = 'hidden';
    }, 100); */
    /* this.init(); */


  }


  parts: M.TopLevel[] = [];
  keywordsService: Array<Keyword2> = [];
  myText: {report: string} = {report: ""};
  //polyp: Array<Category> = [];
  diseases: Array<Disease> = [];
  firstTime: boolean = false;
  myInput: {twInput: string, again: boolean} = {twInput: "", again: false};
  end: boolean = false;
  resetTexts = new Map<M.CheckBox | M.Option, string>();
  oldInput : string = "";

  parsingString: string = "";
 // recogWords : {Array<string>} = [];
  




  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient,
              private route: ActivatedRoute, private inputParser: InputParserService,
              private textOut: TextOutputService) {
    route.paramMap.subscribe(ps => {
      if (ps.get('name')) {

        http.post(environment.urlRoot + 'get', JSON.stringify(ps.get('name'))).subscribe(
          worked => {
            this.parts = worked as any;
            console.log("JSON Element");
            console.log(worked);
            //const s = "\nSM-Aggregat re. pektoral, 2 konnektierte Sondenkabel in Projektion auf rechtes Atrium, Epikardium endend. "
            //const box = (this.parts[5] as any).selectables[2];
            //const taker = P.boxTaker(box, this.parts);
            //console.log(taker(s));
            //console.log(T.compound([T.text("abc"), T.optional(T.text(", "))])("abc, "));
          },
          error => window.alert("An unknown error occured: " + JSON.stringify(error))
        );
      }
    });
  }

  inputClick(){
    if(!this.start){
      this.inputParser.createStartDict(this.parts);
      this.start = true;
      }
    this.readConfig();
    this.changeButton();
  }

  changeButton(){
    if(!this.end){
      let signalButton = document.getElementById("listening");
      signalButton.classList.toggle("btn-danger");
      signalButton.classList.toggle("btn-success");
      if(signalButton.innerText==="Ein"){
        signalButton.innerText = "Aus";
      } else {
        signalButton.innerText = "Ein";
      }
    }
  }


  /* inputOrPaste(ev){
    if(ev.type==="paste"){
      this.onInput(ev.clipboardData.getData('text'));
    } else if (ev.type==="input" && ev.inputType==="insertText"){
      this.onInput(ev.data);
    }
  } */
  
  onInput(ev){
    /* if(!this.firstTime){
      this.inputParser.createStartDict(this.parts);
      this.readConfig();
      this.firstTime = true;
    } */
    //this.twoWayInput += "In ";
    //let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    console.log("event");
    console.log(ev);
    let inp = (document.getElementById('input') as HTMLTextAreaElement).value;
    let dif : string;
    if (this.oldInput ===""){
      dif = inp;
    } else {
    dif = inp.replace(this.oldInput, ""); 
    }
    console.log("dif and inp");
    console.log(dif);
    console.log(inp);
    this.oldInput = inp;
    this.myInput.twInput += dif;
    //console.log(ev.clipboardData.getData('text'));
    //this.myInput.twInput += ev.data;
    this.myText.report = this.inputParser.parseInput(this.myInput.twInput);
    let inpArr: Array<string> = JSON.parse(JSON.stringify(this.myInput.twInput.toLowerCase())).split(" ");
    this.end = this.inputParser.end;
    this.textOut.finalOut(this.end, inpArr);
    this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    if(this.myInput.again){
      this.myText.report = this.inputParser.parseInput(this.myInput.twInput);
      this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    }
   // this.myText.report = this.textOut.makeReport(this.diseases);
  }
  // (currently not used: Keyword options are also clickable as radio input)

  /*onRadioClick(keyName: string, category: string){
     let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    let buttonPos = input.length - 0.5
    this.inputParser.radioClicked(buttonPos, keyName, category);
    this.inputParser.parseInput(input);
    this.textOut.colorTextInput(input,JSON.parse(JSON.stringify(this.keywordsService)) );
    this.textOut.makeReport(this.keywordsService);



  }*/

  makeNormal(){
    let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    this.myText.report = this.inputParser.parseInput(input + " rest normal");
    this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), input );
  }

  start: boolean = false;
  init(): void {

    //let restNormalSynonyms = ["Rest normal", "Rest ist normal"];
    if(!this.start){
    this.inputParser.createStartDict(this.parts);
    this.start = true;
    }
    this.readConfig();
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
    if(konfig != null){
    konfig.parentNode.removeChild(konfig);
    }
    if(konfig != null){
    let remove = document.getElementById("Spaltenbreite");
    remove.parentNode.removeChild(remove);
    remove = document.getElementById("Spaltenbreitebox");
    remove.parentNode.removeChild(remove);
    remove = document.getElementById("BildUpload");
    remove.parentNode.removeChild(remove);
    remove = document.getElementById("BildUploadbox");
    remove.parentNode.removeChild(remove);
    }
   /*  var test = this.keywords.find(x => x.name === "Spaltenbreite");
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
    }*/

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




 /*  getDefault() {
    var cat = this.parts.filter(x => x.kind === "category");
    for (var d of cat) {
      this.defBox = this.defBox.concat((d as M.Category).selectables.filter(x => x.kind === "box" && x.value === true));
      //this.defGroup = this.defGroup.concat((d as M.Category).selectables.filter(x => x.kind === "group" && x.value != "" && x.value != null));
    }
  } */

/*   setDefault() {
    for (var b of this.defBox) {
      (b as M.CheckBox).value = true;
    }
  } */

  exists2D(arr, search) {
    return arr.some(row => row.includes(search));
  }

/*   makeNormal(): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        G.makeNormalCategory(p);
      }
    }
    this.makeText();
  } */


/*   saveDialog(): void {
    localStorage.setItem("emptyDialog", JSON.stringify(JSON.parse(this.text)));
    this.parts = JSON.parse(this.text);
    this.text = "";
  } */

}

