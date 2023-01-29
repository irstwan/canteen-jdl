import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Item} from '../../model/Item';
import {CollectionAddress} from '../../model/CollectionAddress';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  items: Item[] = [];
  productId: string = ''
  name: string = ''
  stock: number = 0;
  price: number = 0;
  urlImage: string = ''
  barcode: string = '';

  isEdit = false;

  constructor( private firestore: AngularFirestore ){
    this.getLatestData();
  }

  getLatestData(): void {
    let data = this.firestore.collection(CollectionAddress.ITEM);
    let latestData = data.valueChanges({ idField: 'itemId' });
    latestData.subscribe((res) => {
      this.items = res as Item[];
    });
    this.isEdit = false
  }

  save(): void {
    let product: Item = {
      itemId: this.productId,
      name: this.name,
      stock: this.stock,
      price: this.price,
      urlImage: this.urlImage,
      barcode: this.barcode
    }
    this.firestore.collection(CollectionAddress.ITEM)
      .add(product)
      .then(res => {
        console.log(res);
        this.getLatestData();
        this.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

  getEditData(product: Item): void {
    this.isEdit = true;
    this.productId = product.itemId;
    this.name = product.name;
    this.stock = product.stock;
    this.price = product.price;
    this.urlImage = product.urlImage;
    this.barcode = product.barcode
    window.scrollTo(0,0);
  }

  edit() {
    let product: Item = {
      itemId: this.productId,
      name: this.name,
      stock: this.stock,
      price: this.price,
      urlImage: this.urlImage,
      barcode: this.barcode
    }
    this.firestore.collection(CollectionAddress.ITEM)
      .doc(this.productId)
      .update(product)
      .then(res => {
        console.log(res);
        this.getLatestData();
        this.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

  delete(product: Item): void {
    this.firestore.collection(CollectionAddress.ITEM)
      .doc(product.itemId)
      .delete()
      .then(res => {
        console.log(res);
        this.getLatestData();
        this.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

  reset() {
    this.isEdit = false;
    this.productId = '';
    this.name = '';
    this.price = 0;
    this.urlImage = '';
    this.stock = 0;
    this.barcode = ''
  }
}
