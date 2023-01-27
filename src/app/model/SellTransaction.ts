import {CartItem} from './CartItem';

export interface SellTransaction {
  transactionId: string;
  // transactionDate: any;
  items: CartItem[];
}
