import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {Item} from '../../model/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  quantity = 1;
  items: Item[] = [];
  itemsFiltered: Item[] = [];
  @Input() set searchByKeyword(keyword: string) {
    this.itemsFiltered = this.items.filter(product => {
      let productData = product?.barcode + ' ' +
        product?.name + ' ' + product?.price + ' ' +
        product?.stock;
      productData = productData.toLowerCase();
      return productData.includes(keyword?.toLowerCase());
    });
    console.log('filter: ', this.itemsFiltered)
  }

  constructor( private firestore: AngularFirestore ) {
    this.getItems();
  }

  incrementQuantity() {
    if (this.quantity < 99 ) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 0 ) {
      this.quantity--;
    }
  }

  updateQuantity() {
    // code for updating quantity
  }

  private getItems() {
    this.firestore.collection(CollectionAddress.ITEM)
      .get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.items.push(<Item>doc.data());
        this.itemsFiltered = this.items;
      });
    })
  }
}
