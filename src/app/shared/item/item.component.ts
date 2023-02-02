import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from '../../model/CartItem';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: CartItem;
  @Output() cartItemsEmitter = new EventEmitter();
  isFocus = false;

  constructor(private mandatoryUtils: MandatoryUtilsService) {
  }

  getRupiahFormatter(nominal: number): string {
    return this.mandatoryUtils.getRupiahFormatter(nominal);
  }

  incrementQuantity(item: CartItem, event: any) {
    if (item.quantity < 99 ) {
      item.quantity++;
      this.setEmit();
    }
    event.stopPropagation();
  }

  decrementQuantity(item: CartItem, event: any) {
    if (item.quantity > 0 ) {
      item.quantity--;
      this.setEmit();
    }
    event.stopPropagation();
  }

  setInput() {
    this.setEmit();
  }

  removeItemFromCart(item: CartItem): void {
    item.quantity = 0;
    this.setEmit();
  }

  onFocusChange(value: boolean) {
    this.isFocus = value;
  }

  setEmit(): void {
    this.cartItemsEmitter.emit();
  }
}
