import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {collection, getDocs, getFirestore, query, where} from '@angular/fire/firestore';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {DatePipe} from '@angular/common';
import {CollectionAddress} from '../../model/CollectionAddress';
import {SellTransaction} from '../../model/SellTransaction';
import {CartItem} from '../../model/CartItem';

@Component({
  selector: 'app-sales-report-peritem',
  templateUrl: './sales-report-peritem.component.html',
  styleUrls: ['./sales-report-peritem.component.css']
})
export class SalesReportPeritemComponent implements OnInit {
  displayedColumns: string[] = ['position', 'itemId', 'barcode', 'name', 'quantity'];
  dataSource: CartItem[] = [];
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
      const items = transactionData.items;
      items.forEach((item) => {
        const index = this.dataSource.findIndex(itemTemp => itemTemp.itemId === item.itemId);
        if (index === -1) {
          this.dataSource.push(item);
        } else {
          this.dataSource[index].quantity = this.dataSource[index].quantity + item.quantity;
        }
      });
    });
  }

  showReport(): void {
    this.getReport().then(() => {});
  }

  getNominalFormatter(nominal: number): string {
    return this.mandatoryUtils.getRupiahFormatter(nominal);
  }
}
