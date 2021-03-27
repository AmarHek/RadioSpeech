import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as M from '../../helper-classes/new_model'
import { Keyword2, Disease, TextDic } from './Keyword';
import { InputParserService } from '../services/input-parser.service';
import { TextOutputService } from '../services/text-output.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DictManagerService } from '../services/dict-manager.service';
import { ParserBasisService } from '../services/parser-basis.service';


declare const $: any;

@Component({
  selector: 'app-text',
  templateUrl: './gastro.component.html',
  styleUrls: ['./gastro.component.scss']
})
export class GastroComponent implements OnInit, OnDestroy {

  errorMsg = "";
  isLoading: boolean = false;
  routeName: string;
  private textSub: Subscription;
  parts: M.myDict = { name: "", dict: [], id: "" };
  keywordsService: Array<Keyword2> = [];
  myText: { report: string } = { report: "" };
  diseases: Array<Disease> = [];
  firstTime: boolean = false;
  myInput: { twInput: string, again: boolean } = { twInput: "", again: false };
  end: boolean = false;
  end0: boolean = false;
  resetTexts = new Map<M.CheckBox | M.Option, string>();
  oldInput: string = "";
  missing: Array<TextDic> = [];
  filledCats: Array<TextDic> = [];
  parsingString: string = "";
  jsDown: SafeUrl;
  jsDown2: SafeUrl;
  inner: string = "hey";
  faCheck = faCheckCircle;
  getReady: boolean = false;

  // recogWords : {Array<string>} = [];

  @ViewChild('myReport', { static: false }) myReport: ElementRef;
  @ViewChild('myJson', { static: false }) myJson: ElementRef;

  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient,
    private route: ActivatedRoute, private inputParser: InputParserService,
    private textOut: TextOutputService, private sanitizer: DomSanitizer,
    private dictManager: DictManagerService, private router: Router, private base: ParserBasisService) {
  }



  ngOnDestroy(): void {
    this.textSub.unsubscribe();
  }

  ngOnInit(): void {
    // assigns reference to polyp object
    //this.polyp = this.inputParser.polyp;
    this.route.paramMap.subscribe((ps) => {
      if (ps.has("name")) {
        this.routeName = ps.get("name");
        this.isLoading = true;
        this.dictManager.getList();
        this.textSub = this.dictManager
          .getListUpdateListener()
          .subscribe((list: M.myDict[]) => {
            this.isLoading = false;
            this.parts = list.find((d) => d.name === this.routeName);
            if (this.parts == undefined) {
              this.errorMsg =
                "Dieses Dictionary existiert nicht! Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.";
            } else {
              if (!this.inputParser.start) {
                this.inputParser.createStartDict(this.parts.dict);
                this.inputParser.start = true;
              }
            }
            /* this.dictionaryService.setDict(list.find(d => d.name === this.routeName));
            this.new_parts = this.dictionaryService.myDict.dict; */
            /* this.myList[1].name = "Leo2";
            this.dictManager.updateDict(this.myList[1]); */
            console.log("onInit");
            console.log(this.parts);
            //console.log(this.new_parts);
          });
      } else {
        this.errorMsg =
          "Kein Dictionary zum Editieren ausgewählt! Bitte auf List Seite zurückkehren und das gewünschte Dictionary auswählen.";
      }
    });
    this.diseases = this.base.diseases;
    this.missing = this.base.missing;
    this.firstTime = false;
    this.myInput = this.inputParser.twInput;
    this.jsDown = this.textOut.downJson;
    this.filledCats = this.textOut.rep;
    //this.recogWords = this.textOut.recogWords;
  }


  // used that only one synonym for each keyword is shown on the interface
  filterSyn(arr: Array<Keyword2>) {
    return arr.filter(key => key.name == key.synonym);
  }


  triggerClick() {
    let el: HTMLElement = this.myReport.nativeElement as HTMLElement;
    let el2: HTMLElement = this.myJson.nativeElement as HTMLElement;
    setTimeout(() => {
      el.click();
      el2.click();
    }, 2000);

  }




  catUsed(dis: string, cat: string) {
    if (this.filledCats.find(el => el.disName === dis).reports.find(el => el.category === cat).key !== "") {
      return true
    } else {
      return false
    }
  }
  KeysExample(dis: string, cat: string) {
    let elements: Array<String> = [];
    let element = this.diseases.find(el1 => el1.name === dis).categories.find(el2 => el2.name === cat);
    for (let i = 0; i < 2; i++) {
      if (element.keys.length==1) {
        elements.push(this.diseases.find(el1 => el1.name === dis).categories.find(el2 => el2.name === cat).keys[0].synonym);
        return "z.B.: " + elements[0].replace("[d]", "[Zahl]");
      } else {
        elements.push(this.diseases.find(el1 => el1.name === dis).categories.find(el2 => el2.name === cat).keys.filter(el3 => el3.name === el3.synonym)[i].name);
      }
    }
    return "z.B.: " + elements.join(", ") + "...";
  }

  whichKeyUsed(dis: string, cat: string, cond = false) {
    let element = this.diseases.find(el1 => el1.name === dis).categories.find(el2 => el2.name === cat).keys.find(el3 => el3.position !== -1);
    if (element === undefined) {
      return undefined;
    }
    if (cond == true && element == this.diseases.find(el1 => el1.name === dis).categories.find(el2 => el2.name === cat).keys[0]){
      return undefined;
    }
    let re: string = element.name;
    if (element.name.includes("[d]")) {
      re = element.synonym;
    }
    for (let i = 0; i < element.variables.length; i++) {
      if (i === 0) {
        re += ": "
      } else {
        re += " +++ "
      }
      if (element.variables[i].kind === "text") {
        let letters = element.variables[i].options[0].replace(/[^a-z]/gi, '');
        if (element.variables[i].varFound[0] != undefined) {
          re += "<span> \"" + element.variables[i].varFound[0].replace(element.variables[i].textAfter, "") + "\"</span>";
        } else {
          re += "<span> \"" + element.variables[i].textBefore + "... [" + letters + "]\"</span>";
        }
      }
      else {
        if (element.variables[i].varFound[0] != undefined) {
          re += "<span> \"" + element.variables[i].varFound[0] + "\"</span>";
        } else {
          for (let j = 0; j < element.variables[i].options.length; j++) {
            if (j > 0) {
              re += " / "
            }
            re += "<span> \"" + element.variables[i].options[j] + "\"</span>";

          }
        }
      }
    }
    return re;
  }

  inputClick() {


    this.changeButton();
  }

  changeButton() {
    if (!this.end) {
      let signalButton = document.getElementById("listening");
      signalButton.classList.toggle("btn-danger");
      signalButton.classList.toggle("btn-success");
      if (signalButton.innerText === "Ein") {
        signalButton.innerText = "Aus";
      } else {
        signalButton.innerText = "Ein";
      }
    }
  }


  onInput(ev) {
    /* if(!this.firstTime){
      this.inputParser.createStartDict(this.parts);
      this.readConfig();
      this.firstTime = true;
    } */
    //this.twoWayInput += "In ";
    //let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    /* console.log("event");
    console.log(ev); */
    let inp = (document.getElementById('input') as HTMLTextAreaElement).value;
    let dif: string;

    if (this.oldInput === "") {
      dif = inp;
      this.oldInput = inp;
      this.myInput.twInput += dif;
    } else {
      if (inp.toLowerCase().lastIndexOf("pause") > inp.toLowerCase().lastIndexOf("weiter")) {
        if (!this.getReady) {
          this.changeButton();
        }
        this.getReady = true;
      } else {
        if (this.getReady) {
          this.oldInput = inp;
          if (this.getReady) {
            this.changeButton();
          }
          this.getReady = false;

          console.log("weiter");
          console.log(this.oldInput);
        } else {

          dif = inp.replace(this.oldInput, "");
          console.log("dif");
          console.log(dif);
          this.oldInput = inp;
          this.myInput.twInput += dif;
        }
      }
    }
    //console.log(ev.clipboardData.getData('text'));
    //this.myInput.twInput += ev.data;
    this.myText.report = this.inputParser.parseInput(this.myInput.twInput.toLowerCase());
    let inpArr: Array<string> = JSON.parse(JSON.stringify(this.myInput.twInput.toLowerCase())).split(" ");
    this.end = this.base.end;
    this.textOut.finalOut(this.end, inpArr);
    this.jsDown = this.textOut.downJson;
    this.jsDown2 = this.textOut.downJson2;
    if (this.end) {
      this.triggerClick();
    }

    this.end0 = this.base.end0;
    if (this.end0) {
      // document.getElementById("Form1").innerHTML = "bye";
      this.inner = "bye";
    }
    this.missing = this.base.missing;
    /* console.log("MissingComp");
    console.log(this.missing); */

    this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    if (this.myInput.again) {
      this.myText.report = this.inputParser.parseInput(this.myInput.twInput);
      this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    }
    // this.myText.report = this.textOut.makeReport(this.diseases);
  }


  makeNormal() {
    let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    this.myText.report = this.inputParser.parseInput(input + " rest normal");
    this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), input);
  }

  refreshPage() {
    window.location.reload();
  }

}

