import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SellTransaction} from '../../model/SellTransaction';
import {collection, getDocs, getFirestore, query, where} from '@angular/fire/firestore';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {DatePipe} from '@angular/common';
import {CollectionAddress} from '../../model/CollectionAddress';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'transactionId', 'datetime', 'items.barcode', 'items', 'items.quantity', 'total'];
  dataSource: SellTransaction[] = [];
  readonly db = getFirestore();
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
    this.dataSource = [];
    const startDate = new Date(`${this.datePipe.transform(this.range.controls.start.value,"yyyy-MM-dd")} 00:00:00`);
    const endDate = new Date(`${this.datePipe.transform(this.range.controls.end.value,"yyyy-MM-dd")} 23:59:59`);
    const q = query(collection(this.db, CollectionAddress.SELL_TRANSACTION), where('datetime', '>=', startDate), where('datetime', '<=', endDate));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const transactionData = <SellTransaction>doc.data();
      this.dataSource.push(transactionData);
    });
  }

  showReport(): void {
    this.getReport().then(() => {});
  }

  getNominalFormatter(nominal: number): string {
    return this.mandatoryUtils.getRupiahFormatter(nominal);
  }
}
