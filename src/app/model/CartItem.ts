import {Item} from './Item';

export interface CartItem {
  quantity: number;
  itemId: string;
  barcode: string;
  name: string;
  price: number;
}
