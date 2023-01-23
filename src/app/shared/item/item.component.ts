import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  quantity = 1;

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
}
