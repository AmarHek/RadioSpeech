import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TimeStampsService } from '../time-stamps.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  name: string = "";
  months: string[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  constructor(private http: HttpClient, private router: Router, private timesService: TimeStampsService) { }

  ngOnInit() {
  }

  /*
  uploadNew(){
    const file = (document.getElementById('uploadFile') as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();

    const postData = new FormData();
    postData.append("file", this.form.value.image, this.form.value.name);
    console.log(this.form.value.name);
    console.log(this.form.value.image);
    console.log(postData);
    this.dictManager.addExcel(postData);
  }*/

  upload(): void {
    this.timesService.addTimeStamp(new Date());
    const reader = new FileReader();
    reader.readAsDataURL((document.getElementById('uploadFile') as HTMLInputElement).files[0]);
    reader.onload = () => {
      let dat = new Date();
      const base64 = (reader.result as string).replace(/^.*?base64,/, "");
      const data = { name: this.name + " " + dat.getDate() +" " + this.months[dat.getMonth()] + " " + dat.getFullYear() , data: base64 };
      this.http.post(environment.urlRoot + 'upload', data, { 'observe': 'response' } ).subscribe((result) => {
        window.alert("Upload Erfolgreich");
        this.router.navigate(['list']);

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
