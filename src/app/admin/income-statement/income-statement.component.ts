import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {FormControl, FormGroup} from '@angular/forms';
import {collection, getDocs, getFirestore, query, where} from '@angular/fire/firestore';
import {SellTransaction} from '../../model/SellTransaction';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {DatePipe} from '@angular/common';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.css']
})
export class IncomeStatementComponent implements OnInit {
  readonly db = getFirestore();
  buyTotal = 0;
  sellTotal = 0;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private firestore: AngularFirestore,
              private mandatoryUtils: MandatoryUtilsService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  async getReport(): Promise<void> {
    this.buyTotal = 0;
    this.sellTotal = 0;
    const startDate = new Date(`${this.datePipe.transform(this.range.controls.start.value,"yyyy-MM-dd")} 00:00:00`);
    const endDate = new Date(`${this.datePipe.transform(this.range.controls.end.value,"yyyy-MM-dd")} 23:59:59`);
    const q = query(collection(this.db, CollectionAddress.SELL_TRANSACTION), where('datetime', '>=', startDate), where('datetime', '<=', endDate));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const transactionData = <SellTransaction>doc.data();
      this.buyTotal = this.buyTotal + transactionData.capitalPrice;
      this.sellTotal = this.buyTotal + transactionData.total;
    });
  }

  showReport(): void {
    this.getReport().then(() => {});
  }

  getNominalFormatter(nominal: number): string {
    return this.mandatoryUtils.getRupiahFormatter(nominal);
  }
}
