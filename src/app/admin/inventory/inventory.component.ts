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
  products: Item[] = [];
  productId = ''
  name = ''
  stock = 0;
  price = 0;
  urlImage = ''
  barcode = '';

  isEdit = false;

  constructor( private firestore: AngularFirestore ){
    this.getLatestData();
  }

  getLatestData(): void {
    let data = this.firestore.collection(CollectionAddress.ITEM);
    let latestData = data.valueChanges({ idField: 'productId' });
    latestData.subscribe((res) => {
      this.products = res as Item[];
    });
    this.isEdit = false
  }

  save(): void {
    let product: Item = {
      productId: this.productId,
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
    this.productId = product.productId;
    this.name = product.name;
    this.stock = product.stock;
    this.price = product.price;
    this.urlImage = product.urlImage;
    this.barcode = product.barcode
  }

  edit() {
    let product: Item = {
      productId: this.productId,
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
      .doc(product.productId)
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
