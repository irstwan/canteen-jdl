import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CollectionAddress} from '../../model/CollectionAddress';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  quantity = 1;
  products: Product[] = [];
  productsFiltered: Product[] = [];
  @Input() set searchByKeyword(keyword: string) {
    this.productsFiltered = this.products.filter(product => {
      let productData = product?.barcode + ' ' +
        product?.name + ' ' + product?.price + ' ' +
        product?.stock;
      productData = productData.toLowerCase();
      return productData.includes(keyword?.toLowerCase());
    });
    console.log('filter: ', this.productsFiltered)
  }

  constructor( private firestore: AngularFirestore ) {
    this.getProducts();
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

  private getProducts() {
    this.firestore.collection(CollectionAddress.PRODUCT)
      .get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.products.push(<Product>doc.data());
        this.productsFiltered = this.products;
      });
    })
  }
}
