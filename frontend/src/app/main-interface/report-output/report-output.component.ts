import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "app-report-output",
  templateUrl: "./report-output.component.html",
  styleUrls: ["./report-output.component.scss"]
})
export class ReportOutputComponent implements OnInit {

  @Input() report: string;
  @Input() judgement: string;

  @Output() reportChange = new EventEmitter<string>();
  @Output() judgementChange = new EventEmitter<string>();

  disclaimer: string;

  constructor() { }

  // TODO: make download button
  // TODO: Send change event to layout so changes in report-output are reflected in data structure

  ngOnInit() {
    this.disclaimer = "Dieser Bericht wurde mit Hilfe eines sprachgesteuerten Browsertools aus Textbausteinen erstellt.";
  }

  copyText(inputElement: HTMLTextAreaElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  onInputReport(){
    this.reportChange.emit(this.report)
  }

  onInputJudgement(){
    this.judgementChange.emit(this.judgement)
  }

  copyAll() {
    let fullText: string;
    fullText = this.report + "\n\n" + this.disclaimer + "\n\n\n" + this.judgement + "\n\n" + this.disclaimer;
    const selBox = document.createElement("textarea");
    selBox.value = fullText;
    document.body.append(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }


}
