import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryError, ErrorTableRow, VariableError} from "@app/models/errorModel";
import {displayableQuotient} from "@app/helpers";

@Component({
  selector: "app-radiolearn-differences",
  templateUrl: "./radiolearn-errors.component.html",
  styleUrls: ["./radiolearn-errors.component.scss"]
})
export class RadiolearnErrorsComponent implements OnInit {

  errors: ErrorTableRow[];
  majorErrorCount = 0;
  minorErrorCount = 0;

  constructor(
    private dialogRef: MatDialogRef<RadiolearnErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.rollOutErrors();
    // this.countMajorErrors();
    // this.countMinorErrors();
  }

  close() {
    this.dialogRef.close(false);
  }

  next() {
    this.dialogRef.close(true);
  }

  rollOutErrors() {
    this.errors = [];
    for (const catErr of this.data.errors) {

    }
  }

  displayQuotient(numerator, denominator) {
    return displayableQuotient(numerator as number,
      denominator as number, this.data["fractionDigits"]);
  }

  catRowCount(catError: CategoryError) {
    let result = 0;
    result = catError.errors.length;
    /*
    for (const selError of catError.errors) {
      const varCount = selError.varErr.length;
      result += varCount > 0 ? varCount : 1;
    }*/
    return result;
  }

}
