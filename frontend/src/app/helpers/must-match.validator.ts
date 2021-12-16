import { FormGroup } from "@angular/forms";

// custom validator to check that two fields match
export const mustMatch = (controlName: string, matchingControlName: string) => (formGroup: FormGroup) => {
  const control = formGroup.controls[controlName];
  const matchingControl = formGroup.controls[matchingControlName];

  if (matchingControl.errors && !matchingControl.errors.mustMatch) {
    // return if another validator has already found an error on the matchingControl
    return;
  }

  // set error on matchingControl if validation fails
  if (control.value !== matchingControl.value) {
    matchingControl.setErrors({mustMatch: true});
  } else {
    matchingControl.setErrors(null);
  }
};

export const fileValidator = (controlName: string) => (formGroup: FormGroup) => {
  const file = formGroup.controls[controlName];



}
