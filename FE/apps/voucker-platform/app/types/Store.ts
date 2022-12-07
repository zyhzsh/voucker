import { Voucher } from './Voucher';

export interface Store {
  id: number;
  name: string;
  description: string;
  owner_id: string;
  imageurl: string;
  website: string;
  phone: string;
  store_id: number;
  category: string;
  location: string;
  address: string;
  vouchers?: Voucher[];
}
