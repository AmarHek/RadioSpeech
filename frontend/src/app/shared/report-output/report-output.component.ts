import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "app-report-output",
  templateUrl: "./report-output.component.html",
  styleUrls: ["./report-output.component.scss"]
})
export class ReportOutputComponent implements OnInit {

  @Input() report: string;
  @Input() judgement: string;
  @Output() startReport = new EventEmitter<any>();
  @Output() submitReport = new EventEmitter<any>();

  disclaimer: string;
  timerStarted = false

  constructor() { }

  // TODO: make download button
  // TODO: Send change event to layout so changes in report-output are reflected in data structure

  ngOnInit() {
    this.disclaimer = "Dieser Bericht wurde mit Hilfe eines sprachgesteuerten Browsertools aus Textbausteinen erstellt.";
  }

  submitReportClicked(){
    this.submitReport.emit();
    this.timerStarted = false
  }

  startReportClicked(){
    let id = prompt("Bitte geben Sie die ID der Aufnahme ein:")
    this.startReport.emit(id)
    this.timerStarted = true
  }

  copyText(inputElement: HTMLTextAreaElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
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
