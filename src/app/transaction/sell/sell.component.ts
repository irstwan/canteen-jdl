import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CupertinoPane} from 'cupertino-pane';
import {FormControl} from '@angular/forms';
import {CartItem} from '../../model/CartItem';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {SellTransaction} from '../../model/SellTransaction';
import {serverTimestamp, increment} from '@angular/fire/firestore';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  isScanMode = false;
  cupertinoPane: any;
  keyword: FormControl;
  cartItems: CartItem[] = [];
  @Output() keywordEmitter = new EventEmitter<string>();
  isResetCart = false;
  isLoading = false;
  constructor(
    private mandatoryUtilsService: MandatoryUtilsService,
    private firestore: AngularFirestore,) {
    this.keyword = new FormControl();
  }

  ngOnInit(): void {
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', {
      draggableOver: true
    });

    this.keyword.valueChanges
      .subscribe((value) => {
        this.keywordEmitter.emit(value);
      });
  }

  setKeyword(keyword: string) {
    this.keyword.setValue(keyword);
    this.isScanMode = !this.isScanMode;
  }
  clearSearch(): void {
    this.keyword.setValue('');
  }

  setCartItems(cartItems: CartItem[]): void {
    this.isResetCart = false;
    this.cartItems = cartItems;
    if (cartItems.length) {
      this.cupertinoPane.present({
        animate: true,
        transition: {
          duration: 600,
          from: {
            opacity: 0.7,
            transform: `translateY(280px) perspective(250px) rotateX(65deg) scale(0.3)`
          },
          to: {
            opacity: 1
          }
        }
      });
    }
    else {
      this.cupertinoPane.hide();
    }
  }

  getTotalTransaction(): string {
    let total = 0;
    this.cartItems.forEach((item) => {
      const subtotal = item.buy_price * item.quantity;
      total = total + subtotal;
    })
    return this.mandatoryUtilsService.getRupiahFormatter(total);
  }

  getNominalFormatter(nominal: number): string {
    return this.mandatoryUtilsService.getRupiahFormatter(nominal);
  }

  pay(): void {
    this.isLoading = true;
    let subtotal = 0;
    let capitalPrice = 0;
    this.cartItems.forEach((item) => {
      subtotal = subtotal + (item.quantity * item.sell_price);
      capitalPrice = capitalPrice + (item.quantity * item.buy_price);
    });
    const sellTransactionReq: SellTransaction = {
      subtotal: subtotal,
      total: subtotal,
      transactionId: '',
      capitalPrice: capitalPrice,
      datetime: serverTimestamp(),
      items: this.cartItems
    }
    this.firestore.collection(CollectionAddress.SELL_TRANSACTION)
      .add(sellTransactionReq)
      .then(res => {
        res.update({
          transactionId: res.id
        });
        this.cartItems.forEach((item) => {
          this.firestore.collection(CollectionAddress.ITEM).doc(item.itemId)
            .update({stock: increment(-item.quantity)})
        });
        this.cartItems = [];
        this.isResetCart = true;
        this.cupertinoPane.hide();
        this.isLoading = false;
        this.showSuccessDialog();
      })
      .catch(e => {
        this.isLoading = false;
        // console.log(e);
      })
  }

  showSuccessDialog(): void {
    Swal.fire({
      icon: 'success',
      text: 'Silahkan Scan',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200
    })
  }
}
