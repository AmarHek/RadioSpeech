import { Injectable } from '@angular/core';
import * as N from '../../helper-classes/new_model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {DisplayService} from './display.service';

const url = environment.urlRoot;

@Injectable({
  providedIn: 'root',
})

// -----------------------------------
// This class administrates the list of dicts and executes all api calls
// -----------------------------------

export class DictManagerService {
  myList: Array<N.myDict> = [];
  private listUpdated = new Subject<N.myDict[]>();

  myUrl = url;
  mode: string;
  ui: string;

  constructor(private http: HttpClient,
              private displayService: DisplayService) {
    this.setMode();
    this.setUI();
  }

  setUrl(mode: string) {
    if (mode === 'radio') {
      this.myUrl += 'radio/';
    }
  }

  /*
  initMode(){
    if(!localStorage.getItem("mode")){
      localStorage.setItem("mode", "gastro");
    }
    this.mode = localStorage.getItem("mode");
    this.setUrl(this.mode);
  }*/

  setMode() {
    this.displayService.getMode().subscribe((value) => {
      this.mode = value;
    });
  }

  getMode() {
    return this.mode;
  }

  setUI() {
    this.displayService.getUi().subscribe((value) => {
      this.ui = value;
    });
  }

  getUI() {
    return this.ui;
  }

  getList() {
    this.http
      .get<{ message: string; myDicts: any }>(
       this.myUrl
      )
      .pipe(
        map((getter) => {
          return getter.myDicts.map((retDict) => {
            console.log(retDict);
            return {
              id: retDict._id,
              dict: retDict.dict,
              name: retDict.name,
            };
          });
        })
      )
      .subscribe((transData) => {
        this.myList = transData;
        console.log('Im here');
        console.log(this.myList);
        this.listUpdated.next([...this.myList]);
      });
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  remove(id: string): void {
    this.http
      .delete(this.myUrl + id)
      .subscribe(() => {
        console.log('deleted');
        const update = this.myList.filter((dict) => dict.id !== id);
        this.myList = update;
        console.log(update);
        this.listUpdated.next([...this.myList]);
        // this.myList = update;
      });
    // this.timesService.removeTimeStamp(index);
  }

  addDict(myDict: N.myDict) {
    this.http
      .post<{ message: string; dictId: string }>(
        this.myUrl,
        myDict
      )
      .subscribe((response) => {
        myDict.id = response.dictId;
        console.log(response.message);
        this.myList.push(myDict);
      });
  }

  addExcel(postData: FormData) {
    this.http
      .post<{ message: string; dictId: string }>(
        this.myUrl + 'excel',
        postData
      )
      .subscribe((res) => {
        console.log(res.message);
        console.log(res.dictId);
        let str = '';
        if (res.dictId === 'false') {
          str =
            'Fehler beim Hochladen der Excel Datei. Die Tabelle wurde nicht korrekt befüllt. \n Folgender Fehler ist aufgetreten: \n\n';
        }
        window.alert(str + res.message);
      });
  }

  updateDict(myDict: N.myDict) {
    this.http
      .put(this.myUrl + myDict.id, {
        dict: myDict.dict,
        name: myDict.name,
      })
      .subscribe((response) => {
        console.log(response);
        this.myList[this.myList.findIndex((d) => d.id === myDict.id)] = myDict;
        this.listUpdated.next([...this.myList]);
      });
  }
}

// This is for Radiology



