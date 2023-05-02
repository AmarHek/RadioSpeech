import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "@app/models";

@Component({
  selector: 'app-annotation-popup',
  templateUrl: './annotation-popup.component.html',
  styleUrls: ['./annotation-popup.component.css']
})
export class AnnotationPopupComponent implements OnInit {

  categories: Category[];
  constructor(
    private dialogRef: MatDialogRef<AnnotationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.categories = this.data.categories
  }

  close(){
    this.dialogRef.close(false)
  }

  annotationSelected(name){
    this.dialogRef.close(name)
  }

}
