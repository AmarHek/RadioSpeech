import { Component, OnInit, AfterViewInit, AfterContentInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as M from '../model'
import * as G from '../generator'
import * as P from '../parser'
import * as T from '../takers'
import { Keyword2, Category, Disease } from './Keyword';
import { InputParserService } from '../input-parser.service';
import { TextOutputService } from '../text-output.service';
import { SafeUrl } from '@angular/platform-browser';

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
    this.diseases = this.inputParser.diseases;
    this.firstTime = false;
    this.start = false;
    this.myInput = this.inputParser.twInput;
  }


  parts: M.TopLevel[] = [];
  keywordsService: Array<Keyword2> = [];
  myText: {report: string} = {report: ""};
  diseases: Array<Disease> = [];
  firstTime: boolean = false;
  myInput: {twInput: string, again: boolean} = {twInput: "", again: false};
  end: boolean = false;
  resetTexts = new Map<M.CheckBox | M.Option, string>();
  oldInput : string = "";
  getReady: boolean = false;
  parsingString: string = "";
    jsDown: SafeUrl;
    jsDown2: SafeUrl;
  
@ViewChild('myReport', { static: true }) myReport : ElementRef;
@ViewChild('myJson', { static: true }) myJson : ElementRef;


  triggerClick(){
    let el: HTMLElement = this.myReport.nativeElement as HTMLElement;
    let el2: HTMLElement = this.myJson.nativeElement as HTMLElement;
    setTimeout(()=> {
        el.click();
        el2.click();
      }, 1000);
    
  }

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

  
  onInput(ev){
    console.log("event");
    console.log(ev);
    let inp = (document.getElementById('input') as HTMLTextAreaElement).value;
    let dif : string;
    
    if (this.oldInput ===""){
      dif = inp;
      this.oldInput = inp;
      this.myInput.twInput += dif;
    } else {
      if(inp.toLowerCase().lastIndexOf("pause") > inp.toLowerCase().lastIndexOf("weiter")){
        this.getReady = true;
      } else {
        if(this.getReady){
          this.oldInput = inp;
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
    
    
  
    this.myText.report = this.inputParser.parseInput(this.myInput.twInput);
    let inpArr: Array<string> = JSON.parse(JSON.stringify(this.myInput.twInput.toLowerCase())).split(" ");
    this.end = this.inputParser.end;
    this.textOut.finalOut(this.end, inpArr);
    this.jsDown = this.textOut.downJson;
    this.jsDown2 = this.textOut.downJson2;
    if(this.end){
      this.triggerClick();
    }
    
    this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    if(this.myInput.again){
      this.myText.report = this.inputParser.parseInput(this.myInput.twInput);
      this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), this.myInput.twInput);
    }
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
    if(!this.start){
    this.inputParser.createStartDict(this.parts);
    this.start = true;
    }
  }


  refreshPage() {
    window.location.reload();
  }

 

}

