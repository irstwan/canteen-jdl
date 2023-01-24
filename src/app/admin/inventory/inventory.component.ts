import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Product} from '../../model/Product';
import {CollectionAddress} from '../../model/CollectionAddress';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  products: Product[] = [];
  productId = ''
  name = ''
  stock = 0;
  price = 0;
  urlImage = ''

  isEdit = false;

  constructor( private firestore: AngularFirestore ){
    this.getLatestData();
  }

  getLatestData(): void {
    let data = this.firestore.collection(CollectionAddress.PRODUCT);
    let latestData = data.valueChanges({ idField: 'productId' });
    latestData.subscribe((res) => {
      this.products = res as Product[];
    });
    this.isEdit = false
  }

  save(): void {
    let product: Product = {
      productId: this.productId,
      name: this.name,
      stock: this.stock,
      price: this.price,
      urlImage: this.urlImage
    }
    this.firestore.collection(CollectionAddress.PRODUCT)
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

  getEditData(product: Product): void {
    this.isEdit = true;
    this.productId = product.productId;
    this.name = product.name;
    this.stock = product.stock;
    this.price = product.price;
    this.urlImage = product.urlImage;
  }

  edit() {
    let product: Product = {
      productId: this.productId,
      name: this.name,
      stock: this.stock,
      price: this.price,
      urlImage: this.urlImage
    }
    this.firestore.collection(CollectionAddress.PRODUCT)
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

  delete(product: Product): void {
    this.firestore.collection(CollectionAddress.PRODUCT)
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
  }
}
