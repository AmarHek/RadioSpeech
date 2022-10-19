import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {AuthenticationService} from "@app/core";
import {Role, User} from "@app/models";

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
  timerStarted = false;

  private user: User;

  constructor(private authenticationService: AuthenticationService) { }

  // TODO: make download button
  // TODO: Send change event to layout so changes in report-output are reflected in data structure

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(
      (x) => {
        this.user = x;
      });
    this.disclaimer =
      "Dieser Bericht wurde mit Hilfe eines sprachgesteuerten Browsertools aus Textbausteinen erstellt.";
  }

  submitReportClicked(){
    this.submitReport.emit();
    this.timerStarted = false;
  }

  startReportClicked(){
    let id = prompt("Bitte geben Sie die ID der Aufnahme ein:");
    if (id === null) {
      return;
    } else {
      this.startReport.emit(id);
      this.timerStarted = true;
    }
  }

  copyText(inputElement: HTMLTextAreaElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  copyAll() {
    const fullText: string = this.report + "\n\n" + this.disclaimer +
      "\n\n\n" + this.judgement + "\n\n" + this.disclaimer;
    const selBox = document.createElement("textarea");
    selBox.value = fullText;
    document.body.append(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }


}
