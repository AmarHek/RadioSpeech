import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../util.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: "",
      number: null,
      date: null,
      numerator: null,
      denominator: null
    })
  }

  close() {
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  displayQuotient(numerator, denominator) {
    return this.utilService.displayableQuotient(numerator as number,
      denominator as number, this.data['fractionDigits']);
  }

}
