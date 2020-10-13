import {Component, OnInit, Input} from '@angular/core';
import {TextOutputService} from '../text-output.service';
import {Category} from '../text/Keyword';
import * as P from '../parser';
import {TopLevel} from '../model';

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {

  @Input() report: string;
  @Input() judgement: string;

  @Input() parts: TopLevel[];

  // @ViewChild('reportfield'): reportfield;

  constructor() { }

  ngOnInit() {
  }

  copyText(inputElement: HTMLTextAreaElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  reverse(textElement: HTMLTextAreaElement): void {
    const text = textElement.value;
    P.take(text, this.parts);
  }

  copyAll(){
    let fullText: string = "";
    fullText = this.report + "<br><br>" + this.judgement;
    let selBox = document.createElement('textarea');
    selBox.value = fullText;
    document.body.append(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


}
