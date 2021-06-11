import { Component, OnInit } from "@angular/core";
import {HtmlOutputService} from "../html-output.service";

@Component({
  selector: "app-output-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.css"]
})
export class DisplayComponent implements OnInit {

  imgUrls: Array<string>;
  reports: Array<string>;
  dateAndTime: string;

  constructor(private htmlOutputService: HtmlOutputService) { }

  ngOnInit(): void {
    this.imgUrls = this.htmlOutputService.images;
    this.reports = this.htmlOutputService.reports;
    this.dateAndTime = this.htmlOutputService.dateAndTime;

    this.alignArrays();
  }

  alignArrays() {
    if (this.reports.length > this.imgUrls.length) {
      const diff = this.reports.length - this.imgUrls.length;
      for (let i = 0; i < diff; i++) {
        this.imgUrls.push(null);
      }
    } else if (this.imgUrls.length > this.reports.length) {
      const diff = this.imgUrls.length - this.reports.length;
      for (let i = 0; i < diff; i++) {
        this.reports.push("Kein Bericht vorhanden");
      }
    }
  }

}
