import {CartItem} from './CartItem';
import {FieldValue} from '@firebase/firestore';

export interface SellTransaction {
  transactionId: string;
  subtotal: number;
  total: number;
  datetime: FieldValue;
  // transactionDate: any;
  items: CartItem[];
}
