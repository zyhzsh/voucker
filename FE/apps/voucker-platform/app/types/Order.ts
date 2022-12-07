export type OrderStatus = 'created' | 'cancelled' | 'pennding' | 'completed';

export interface Order {
  id: string;
  status: OrderStatus;
  created_at: Date;
  voucher_name: string;
  price: number;
  voucher_id: number;
  voucher_imageurl: string;
  voucher_description: string;
}
