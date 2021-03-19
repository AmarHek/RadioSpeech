import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TimeStampsService } from '../services/time-stamps.service';
import {DataParserService} from '../services/dataParser.service';
import {DisplayService} from '../services/display.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import * as N from '../../helper-classes/new_model';
import {Subscription} from 'rxjs';
import {DictManagerService} from '../services/dict-manager.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  generators: string[] = [];
  dicts: N.myDict[] = [];
  dictSub: Subscription;
  mode: string;
  ui: string;
  isLoading: boolean;

  constructor(private http: HttpClient,
              private dataParser: DataParserService,
              private timesService: TimeStampsService,
              private displayService: DisplayService,
              private dialog: MatDialog,
              private dictManagerService: DictManagerService) { }

  ngOnInit() {
    this.isLoading = true;
    this.setMode();
    this.setUi();
    this.updateGenerators();
    this.updateList();
  }

  private setMode(): void {
    this.displayService.getMode().subscribe((value) => {
      this.mode = value;
    });
  }

  private setUi(): void {
    this.displayService.getUi().subscribe((value) => {
      this.ui = value;
    });
    console.log(this.ui);
  }

  removeAlert(generator: string) {
    const dialogData = new ConfirmDialogModel(
      'warning',
      'Entfernen bestätigen',
    'Möchten Sie die Schablone \'' + generator + '\' wirklich entfernen?');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';
    dialogConfig.data = dialogData;
    dialogConfig.position = {top: '50px'};

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.remove(generator);
      }
    });
  }

  remove(generator: string): void {
    this.http.post(environment.urlRootRadio + 'remove', JSON.stringify(generator)).subscribe(
      result => { this.updateGenerators(); },
      error => window.alert('unknown error: ' + JSON.stringify(error))
    );
  }

  updateGenerators(): void {
    this.http.post(environment.urlRootRadio + 'list', '').subscribe(
      result => {
                  this.generators = result as any;
                   },
      error => window.alert('unknown error: ' + JSON.stringify(error))
    );
  }

  updateList(): void {
    this.dictSub = this.dictManagerService.getListUpdateListener().subscribe((list: N.myDict[]) => {
      this.dicts = list;
      this.isLoading = false;
      console.log('onInit');
      console.log(this.dicts);
    });
  }

  ngOnDestroy(): void {
    this.dictSub.unsubscribe();
  }

  onRemove(id: string): void {
    this.dictManagerService.remove(id);
  }

  // getTopLevel(generator) {
  //   this.http.post(environment.urlRoot + "get", JSON.stringify(generator)).subscribe(
  //     worked => {
  //       this.dataParser.rawParts = worked as any;
  //       },
  //     error => window.alert("An unknown error occurred: " + JSON.stringify(error))
  //   );
  // }


}
