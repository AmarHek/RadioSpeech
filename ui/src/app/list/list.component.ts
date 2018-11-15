import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  generators: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.updateList();
  }

  remove(generator: string): void {
    this.http.post(environment.urlRoot + 'remove', JSON.stringify(generator)).subscribe(
      result => { this.updateList() },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }

  updateList(): void {
    this.http.post(environment.urlRoot + 'list', '').subscribe(
      result => { this.generators = result as any; },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }

}
