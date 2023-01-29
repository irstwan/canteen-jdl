import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {CartItem} from '../../model/CartItem';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';
import {collection, getFirestore, onSnapshot} from '@angular/fire/firestore';

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
        product?.name + ' ' + product?.price + ' ' +
        product?.stock;
      productData = productData.toLowerCase();
      return productData.includes(keyword?.toLowerCase());
    });
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
      collection(this.db, CollectionAddress.ITEM),
      (snapshot) => {
        snapshot.forEach((doc: any) => {
          let itemResp = <CartItem>doc.data();
          const itemsWithQuantity = this.items.filter((item) => item.quantity > 0);
          const index = itemsWithQuantity.findIndex(item => item.itemId === itemResp.itemId);
          if (index > -1) {
            this.items[index].stock = itemResp.stock;
            this.items[index].price = itemResp.price;
          } else {
            itemResp.quantity = 0;
            this.items.push(itemResp);
            this.itemsFiltered = this.items;
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
