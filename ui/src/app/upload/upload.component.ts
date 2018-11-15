import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  name: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  upload(): void {
    const reader = new FileReader();
    reader.readAsDataURL((document.getElementById('uploadFile') as HTMLInputElement).files[0]);
    reader.onload = () => {
      const base64 = (reader.result as string).replace(/^.*?base64,/, "");
      const data = { name: this.name, data: base64 };
      this.http.post(environment.urlRoot + 'upload', data, { 'observe': 'response' } ).subscribe((result) => {
        window.alert("Upload Erfolgreich");
      }, (error) =>{
        if (error instanceof ErrorEvent) {
          window.alert("an unkown error has occurred")
        } else {
          window.alert("parsing failure: " + (error as any).error);
        }
      });
    };
    reader.onerror = (error) => {
      window.alert('The following error occured:\n' + error);
    };
  }
}
