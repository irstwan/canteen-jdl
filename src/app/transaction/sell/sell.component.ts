import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {CupertinoPane} from 'cupertino-pane';
import {CartItem} from '../../model/CartItem';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {SellTransaction} from '../../model/SellTransaction';
import {serverTimestamp, increment} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';
import Swal from 'sweetalert2'
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  isScanMode = false;
  cupertinoPane: any;
  inputKeyword = '';
  cartItems: CartItem[] = [];
  @Output() keywordEmitter = new EventEmitter<string>();
  isResetCart = false;
  isLoading = false;
  total = 0;
  @ViewChild('myAlert',{static: false})
  myAlert: ElementRef | undefined;

  @ViewChild('inputField') inputField: any;
  keyword: FormControl;
  constructor(
    private mandatoryUtilsService: MandatoryUtilsService,
    private firestore: AngularFirestore,
    public dialog: MatDialog) {
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
    if (cartItems.length && !this.cupertinoPane.isPanePresented()) {
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
    } else if (!this.cartItems.length){
      this.destroyCupertinoPane();
    }
  }

  getTotalTransaction(): string {
    let total = 0;
    this.cartItems.forEach((item) => {
      const subtotal = item.sell_price * item.quantity;
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
    this.total = subtotal;
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
        this.destroyCupertinoPane();
        this.isLoading = false;
        this.showConfirmation();
      })
      .catch(e => {
        this.isLoading = false;
      })
  }

  showQris(nominal: number, isBCA: boolean): void {
    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        nominal: nominal,
        isBCA: isBCA
      },
      height: 'auto',
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.resetCart();
    });
  }

  showConfirmation(): void {
    Swal.fire({
      title: 'Mau bayar dengan akun BCA ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0066AE',
      cancelButtonColor: '#008a3a',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Ya, BCA',
      allowOutsideClick: false,
      allowEscapeKey: false,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.showQris(this.total, true);
      } else {
        this.showQris(this.total, false);
      }
    })
  }

  resetCart(): void {
    this.cartItems = [];
    this.isResetCart = true;
  }

  destroyCupertinoPane(): void {
    this.cupertinoPane.destroy({animate: true});
  }

  // @HostListener('document:keyup', ['$event'])
  // keyEventDelete(event: KeyboardEvent) {
  //   if (event.key === 'Delete' || event.key === 'Backspace') {
  //     this.inputKeyword = this.inputField.nativeElement.value;
  //   } else if (event.key !== 'Enter') {
  //     this.inputKeyword += event.key;
  //     this.inputField.nativeElement.value = this.inputKeyword;
  //   } else if (event.key === 'Enter') {
  //     // Perlu di enhance
  //   }
  // }
  clearListener() {
    this.inputKeyword = '';
    this.inputField.nativeElement.value = '';
  }

  @HostListener('window:offline')
  setNetworkOffline(): void {
    this.offlineAlert();
  }

  @HostListener('window:online')
  setNetworkOnline(): void {
    Swal.close();
  }

  offlineAlert(): void {
    Swal.fire({
      title: 'Gagal koneksi internet',
      icon: 'warning',
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(() => {});
  }
}
