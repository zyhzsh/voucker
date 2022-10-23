import { Store } from './Store';

export interface Voucher {
  id: number;
  name: string;
  description: string;
  inventory: number;
  price: number;
  sold: number;
  category: string;
  location: string;
  imageurl: string;
  status: string;
  store?: Store;
}
