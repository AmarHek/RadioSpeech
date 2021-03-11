import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as M from '../../helper-classes/new_model'
import { Keyword2, Disease, TextDic } from '../gastro/Keyword';
import { TextOutputService } from '../services/text-output.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DictManagerService } from '../services/dict-manager.service';
import { InputParserHierarchischService } from '../services/input-parser-hierarchisch.service';


declare const $: any;

@Component({
  selector: 'app-text-hierarchisch',
  templateUrl: './gastro-hierarchisch.component.html',
  styleUrls: ['./gastro-hierarchisch.component.scss']
})
export class GastroHierarchischComponent implements OnInit, OnDestroy {

  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient,
    private route: ActivatedRoute, private inputParser: InputParserHierarchischService,
    private textOut: TextOutputService, private sanitizer: DomSanitizer,
    private dictManager: DictManagerService, private router: Router) {
  }

  errorMsg = "";
  isLoading: boolean = false;
  routeName: string;
  private textSub: Subscription;
  parts: M.myDict = { name: "", dict: [], id: "" };
  myText: { report: string } = { report: "" };
  diseases: Array<Disease> = [];
  firstTime: boolean = false;
  myInput: { twInput: string, again: boolean } = { twInput: "", again: false };
  end: boolean = false;
  end0: boolean = false;
  oldInput: string = "";
  missing: Array<TextDic> = [];
  filledCats: Array<TextDic> = [];
  jsDown: SafeUrl;
  jsDown2: SafeUrl;
  inner: string = "hey";
  getReady: boolean = false;

  // recogWords : {Array<string>} = [];

  @ViewChild('myReport', { static: false }) myReport: ElementRef;
  @ViewChild('myJson', { static: false }) myJson: ElementRef;


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

              // ###### needs change
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


    // ##### needs change
    this.diseases = this.inputParser.diseases;
    this.missing = this.inputParser.missing;
    this.firstTime = false;
    this.myInput = this.inputParser.twInput;

    // evtl needs change
    this.jsDown = this.textOut.downJson;
    this.filledCats = this.textOut.rep;
    //this.recogWords = this.textOut.recogWords;

  }

  ngOnDestroy(): void {
    this.textSub.unsubscribe();

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
    // continue here
    this.myText.report = this.inputParser.parseInput(this.myInput.twInput.toLowerCase());
    let inpArr: Array<string> = JSON.parse(JSON.stringify(this.myInput.twInput.toLowerCase())).split(" ");
    this.end = this.inputParser.end;
    this.textOut.finalOut(this.end, inpArr);
    this.jsDown = this.textOut.downJson;
    this.jsDown2 = this.textOut.downJson2;
    if (this.end) {
      this.triggerClick();
    }
    //this.end0 = this.inputParser.end0;
    if (this.end0) {
      // document.getElementById("Form1").innerHTML = "bye";
      this.inner = "bye";
    }
    //this.missing = this.inputParser.missing;
    this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    if (this.myInput.again) {
      this.myText.report = this.inputParser.parseInput(this.myInput.twInput);
      this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    }

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
