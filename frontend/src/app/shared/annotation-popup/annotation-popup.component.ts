import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CheckBox, Selectable} from "@app/models";

@Component({
  selector: 'app-annotation-popup',
  templateUrl: './annotation-popup.component.html',
  styleUrls: ['./annotation-popup.component.css']
})
export class AnnotationPopupComponent implements OnInit {

  pathologies: Selectable[];
  selectedPathology: string = "";
  options: string[] = [];
  title = "Diagnose"

  constructor(
    private dialogRef: MatDialogRef<AnnotationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.pathologies = this.data.categories[0].selectables
    this.pathologies.forEach(selectable => {
      this.options.push(selectable.name)
    })
  }

  close() {
    this.dialogRef.close(false)
  }

  annotationSelected(name) {
    this.options = []
    if (this.selectedPathology == "") {
      this.selectedPathology = name
      this.title = name
      let variablesExist = false
      this.pathologies.forEach(pathology => {
        pathology = pathology as CheckBox
        if (pathology.name == this.selectedPathology && pathology.variables.length > 0){
          variablesExist = true
          if (pathology.variables[0].kind == "oc"){
            pathology.variables[0].values.forEach(value => {
              this.options.push(value)
            })
          } else if (pathology.variables[0].kind == "mc"){
            pathology.variables[0].values.forEach(value => {
              this.options.push(value[0])
            })
          }
        }
      })
      if(!variablesExist){
        this.dialogRef.close(name)
      }
    } else {
      this.dialogRef.close(this.selectedPathology + " | " + name)
    }
  }

}
