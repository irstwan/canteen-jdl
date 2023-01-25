import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {CartItem} from '../../model/CartItem';
import {Item} from '../../model/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  items: Item[] = [];
  itemsFiltered: Item[] = [];
  cartItems: CartItem[] = [];
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

  incrementQuantity(item: Item) {
    let quantity = this.getQuantity(item.itemId)
    if (quantity < 99 ) {
      quantity++;
      if (this.cartItems.some(cartItem => cartItem.itemId === item.itemId)) {
        const index = this.cartItems.findIndex(cartItem => cartItem.itemId === cartItem.itemId);
        this.cartItems[index].quantity = quantity;
      } else {
        this.cartItems.push(this.getItemToCartItemMapper(item, quantity));
      }
    }
  }

  decrementQuantity(item: Item) {
    let quantity = this.getQuantity(item.itemId)
    if (quantity > 0 ) {
      quantity--;
      if (this.cartItems.some(cartItem => cartItem.itemId === item.itemId)) {
        const index = this.cartItems.findIndex(cartItem => cartItem.itemId === cartItem.itemId);
        this.cartItems[index].quantity = quantity;
      } else {
        this.cartItems.push(this.getItemToCartItemMapper(item, quantity));
      }
    }
  }

  updateQuantity(event: any) {
    // code for updating quantity
    console.log(event)
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

  getItemToCartItemMapper(item: Item, quantity: number): CartItem {
    return {
      itemId: item.itemId,
      barcode: item.barcode,
      name: item.name,
      price: item.price,
      quantity: quantity
    }
  }

  getQuantity(itemId: string): number {
    const isExist = this.cartItems.some(item => item.itemId === itemId);
    return isExist ? this.cartItems.find(item => item.itemId === itemId)!.quantity : 0;
  }
}
