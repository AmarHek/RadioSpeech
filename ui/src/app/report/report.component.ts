import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {

  @Input() report: string;
  @Input() judgement: string;

  constructor() { }

  // TODO: make download button
  // TODO: Send change event to layout so changes in report are reflected in data structure

  ngOnInit() {
  }

  copyText(inputElement: HTMLTextAreaElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  copyAll(){
    let fullText: string = "";
    fullText = this.report + "\n\n\n" + this.judgement;
    let selBox = document.createElement('textarea');
    selBox.value = fullText;
    document.body.append(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


}
