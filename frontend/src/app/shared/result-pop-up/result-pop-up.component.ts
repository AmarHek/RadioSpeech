import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-result-pop-up",
  templateUrl: "./result-pop-up.component.html",
  styleUrls: ["./result-pop-up.component.css"]
})
export class ResultPopUpComponent implements OnInit, AfterViewInit {
  @Input() result: any;
  @ViewChild("chartCanvas") chartCanvas: ElementRef<HTMLCanvasElement>;

  constructor() {
    Chart.register(...registerables); // Register Chart.js plugins
  }

  ngOnInit() {
    this.displayChart();
  }

  ngAfterViewInit() {
    this.displayChart();
  }

  private displayChart() {
    // Prepare chart data
    const labels = Object.keys(this.result);
    const values = Object.values(this.result);

    // Create chart
    const ctx = this.chartCanvas.nativeElement.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Result",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
