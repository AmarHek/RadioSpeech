import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public displayableQuotient(numerator: number, denominator: number, fractionDigits: number = 2): string {
    let res = numerator / denominator ;
    if(isFinite(res)) {
      return res.toFixed(fractionDigits);
    } else {
      return "   ";
    }
  }

  public refreshPage() {
    window.location.reload();
  }
}
