import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {CartItem} from '../../model/CartItem';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {collection, getFirestore, onSnapshot, query, where} from '@angular/fire/firestore';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  readonly db = getFirestore();
  items: CartItem[] = [];
  itemsFiltered: CartItem[] = [];
  @Input() set searchByKeyword(keyword: string) {
    this.itemsFiltered = this.items.filter(product => {
      let productData = product?.barcode + ' ' +
        product?.name + ' ' + product?.buy_price + ' ' +
        product?.stock;
      productData = productData.toLowerCase();
      return productData.includes(keyword?.toLowerCase());
    });
  }

  @Input() set reset(isReset: boolean) {
    if (isReset) {
      this.items = this.itemsFiltered.map(item => {
        item.quantity = 0;
        return item;
      })
    }
  }

  @Output() cartItemsEmitter = new EventEmitter<CartItem[]>();
  constructor( private firestore: AngularFirestore,
               private mandatoryUtils: MandatoryUtilsService) {

    this.getItems();
  }

  incrementQuantity(item: CartItem) {
    if (item.quantity < 99 ) {
      item.quantity++;
      this.setEmit();
    }
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 0 ) {
      item.quantity--;
      this.setEmit();
    }
  }

  private getItems() {
    onSnapshot(
      query(collection(this.db, CollectionAddress.ITEM), where('stock', '>', 0)),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const itemChange = <CartItem>change.doc.data();
          if (change.type === "added") {
            itemChange.quantity = 0;
            this.items.push(itemChange);
            this.itemsFiltered = this.items;
          }
          if (change.type === "modified") {
            const index = this.items.findIndex(item => item.itemId === itemChange.itemId);
            this.items[index].stock = itemChange.stock;
            this.items[index].buy_price = itemChange.buy_price;
          }
          if (change.type === "removed") {
            const index = this.items.findIndex(item => item.itemId === itemChange.itemId);
            this.items.splice(index, 1);
            const indexFilter = this.itemsFiltered.findIndex(item => item.itemId === itemChange.itemId);
            if (indexFilter > -1) {
              this.itemsFiltered.splice(indexFilter, 1);
            }
          }
        });
      },
      (error) => {
        // ...
      });
  }

  setInput() {
    this.setEmit();
  }

  setEmit(): void {
    const cartItems = this.itemsFiltered.filter(item => item.quantity > 0);
    this.cartItemsEmitter.emit(cartItems);
  }

  removeItemFromCart(item: CartItem): void {
    item.quantity = 0;
    this.setEmit();
  }

  getRupiahFormatter(nominal: number): string {
    return this.mandatoryUtils.getRupiahFormatter(nominal);
  }
}
