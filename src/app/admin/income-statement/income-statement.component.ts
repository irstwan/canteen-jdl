import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {FormControl, FormGroup} from '@angular/forms';
import {collection, getDocs, getFirestore, query, where} from '@angular/fire/firestore';

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
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private firestore: AngularFirestore ) { }

  ngOnInit(): void {
    this.getReport().then(() => {});
  }

  async getReport(): Promise<void> {
    const startDate = new Date('2023-01-30 00:00:00');
    const endDate = new Date('2023-01-30 02:59:59');
    const q = query(collection(this.db, CollectionAddress.SELL_TRANSACTION), where('datetime', '>=', startDate), where('datetime', '<=', endDate));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
}
