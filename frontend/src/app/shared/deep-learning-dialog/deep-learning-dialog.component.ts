import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-deep-learning-dialog",
  templateUrl: "./deep-learning-dialog.component.html",
  styleUrls: ["./deep-learning-dialog.component.css"]
})
export class DeepLearningDialogComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  @ViewChild("dropdown") dropdown: ElementRef;
  @ViewChild("chartContainer", {read: ViewContainerRef}) chartContainer: ViewContainerRef;

  selectedFile: File = null;
  resultData: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private _location: Location,
              public dialog: MatDialog
  ) {
  }

  popUpDetektion(url: string) {
    // Display the image
    console.log(url);
    const urllocal = `http://localhost:5000/${url}`;
    const windowUrl = window.open(urllocal, "New Window", "height=500,width=500");
  }

  popUpKlassifikation(url: string, result: any) {
    // Display the image
    console.log(url);
    const urllocal = `http://localhost:5000/${url}`;
    const windowUrl = window.open(urllocal, "New Window", "height=500,width=500");

    // Display the chart
    const windowResult = window.open("", "_blank", "width=500,height=300");
    windowResult.document.write(`
    <html>
      <head>
        <title>Result</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <div>
          <canvas id="chartCanvas"></canvas>
        </div>
        <script>
          // Prepare chart data
          const labels = ${JSON.stringify(Object.keys(result))};
          const values = ${JSON.stringify(Object.values(result))};

          // Create initial chart
          const ctx = document.getElementById('chartCanvas').getContext('2d');
          let chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets: [{
                label: 'Result',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
/*//Doesnt work
          // Toggle layout on button click
          const toggleButton = document.getElementById('toggleButton');
          toggleButton.addEventListener('click', () => {
            const newType = chart.config.type === 'bar' ? 'horizontalBar' : 'bar';
            chart.config.type = newType;
            chart.update();
          });*/
        </script>
      </body>
    </html>
  `);
    windowResult.document.close();
  }

  /*
  //Outsourced Component, does not work
    popUp(url: string, result: any) {
      // Display the image
      console.log(url);
      const urllocal = `http://localhost:5000/${url}`;
      const windowUrl = window.open(urllocal, "New Window", "height=500,width=500");

      // Display the chart
      const windowResult = window.open("", "_blank", "width=500,height=250");
      windowResult.document.write(`
        <app-result-pop-up [result]="result"></app-result-pop-up>
      `);
      windowResult.document.close();
    }
  */
  abort() {
    console.log("Abort");
    this.dialog.closeAll();
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    console.log("Sent data");
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      formData.append("dropdown", this.dropdown.nativeElement.value);
      this.http.post("http://localhost:5000/", formData)
        .subscribe({
          next: (response) => {
            if (this.dropdown.nativeElement.value === "Klassifikation") {
              this.popUpKlassifikation(response["url"].toString(), response["result"]);
              console.log(response);
            } else if (this.dropdown.nativeElement.value === "Detektion") {
              this.popUpDetektion(response["url"].toString());
              console.log(response);
            }
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }
}
