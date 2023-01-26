import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {CartItem} from '../../model/CartItem';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
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
    this.firestore.collection(CollectionAddress.ITEM)
      .get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let item = <CartItem>doc.data();
        item.quantity = 0;
        this.items.push(item);
        this.itemsFiltered = this.items;
      });
    })
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
