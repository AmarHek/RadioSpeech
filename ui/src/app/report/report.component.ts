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

  ngOnInit() {
  }

  copyText(inputElement: HTMLTextAreaElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  // TODO: Make sense of this
  // reverse(textElement: HTMLTextAreaElement): void {
  //   const text = textElement.value;
  //   P.take(text, this.parts);
  // }


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
