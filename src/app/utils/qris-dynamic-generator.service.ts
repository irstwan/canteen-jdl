import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrisDynamicGeneratorService {
  constructor() {}

  generateQRIS(payAmount: number): string {

    let qris = environment.qrisjdl;
    let nominal: string = payAmount.toString().trim();
    let serviceFee = 'n'; //n=no, y=yes
    let serviceFeeType = ''; //r=rupiah, p=persen
    let serviceAmount = '';
    let result: string = '';

    if (serviceFee === 'y') {
      if (serviceFeeType === 'r') {
        serviceAmount = '55020256' + serviceAmount.toString().length.toString().padStart(2, '0') + serviceAmount;
      } else if (serviceFeeType === 'p') {
        serviceAmount = '55020357' + serviceAmount.toString().length.toString().padStart(2, '0') + serviceAmount;
      }
    }

    qris = qris.substring(0, qris.length - 4);
    let step1 = qris.replace('010211', '010212');
    let step2 = step1.split('5802ID');
    let uang = '54' + nominal.toString().length.toString().padStart(2, '0') + nominal;

    if (!serviceAmount) {
      uang += '5802ID';
    } else {
      uang += serviceAmount + '5802ID';
    }

    result = step2[0] + uang + step2[1];
    result += this.calculateCRC16(result);
    return result;
  }

  calculateCRC16(str: string): string {
    let crc = 0xFFFF;
    let strlen = str.length;

    for (let c = 0; c < strlen; c++) {
      crc ^= str.charCodeAt(c) << 8;
      for (let i = 0; i < 8; i++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc = crc << 1;
        }
      }
    }

    let hex: any = crc & 0xFFFF;
    hex = hex.toString(16).toUpperCase();
    if (hex.length === 3) hex = '0' + hex;
    return hex;
  }
}
