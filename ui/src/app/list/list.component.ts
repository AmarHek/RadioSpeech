import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TimeStampsService } from '../time-stamps.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  generators: string[] = [];
  myArr: string[] = [];
  constructor(private http: HttpClient, private timesService: TimeStampsService) { }

  ngOnInit() {
    this.updateList();
    console.log("onInit");
    console.log(this.generators);
    
    //this.times = this.timesService.times;
    
  }

  remove(generator: string, index: number): void {
    this.http.post(environment.urlRoot + 'remove', JSON.stringify(generator)).subscribe(
      result => { this.updateList() },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
    //this.timesService.removeTimeStamp(index);
  }

  updateList(): void {
    this.http.post(environment.urlRoot + 'list', '').subscribe(
      result => { 
                  this.generators = result as any;
                  /* for(let i = 0; i< this.generators.length; i++){
                    let help = this.generators[i].split(" ")[0];
                    let it: string[] = this.generators[i].split(" ").slice(1);
                    this.generators[i] = help;
                    this.myArr.push(it.join(" "));
                  }
                  console.log(this.myArr); */
                   },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }

}
