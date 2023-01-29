import {CartItem} from './CartItem';
import {FieldValue} from '@firebase/firestore';

export interface SellTransaction {
  transactionId: string;
  subtotal: number;
  total: number;
  datetime: FieldValue;
  capitalPrice: number;
  // transactionDate: any;
  items: CartItem[];
}
