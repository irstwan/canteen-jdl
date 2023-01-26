import {Component, Input} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {CartItem} from '../../model/CartItem';

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

  constructor( private firestore: AngularFirestore ) {
    this.getItems();
  }

  incrementQuantity(item: CartItem) {
    if (item.quantity < 99 ) {
      item.quantity++;
    }
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 0 ) {
      item.quantity--;
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
}
