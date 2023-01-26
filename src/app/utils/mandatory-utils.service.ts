import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MandatoryUtilsService {

  constructor() { }

  getRupiahFormatter(nominal: number): string {
    let nominalString = nominal.toString(),
      split    = nominalString.split(','),
      over     = split[0].length % 3,
      currency     = split[0].substring(0, over),
      thousand     = split[0].substring(over).match(/\d{3}/gi);

    if (thousand) {
      let separator = over ? '.' : '';
      currency += separator + thousand.join('.');
    }

    currency = split[1] != undefined ? currency + ',' + split[1] : currency;
    return 'Rp. ' + currency
  }
}
