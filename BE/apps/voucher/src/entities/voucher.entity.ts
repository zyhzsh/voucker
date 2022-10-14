import { Store } from './store.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type VoucherStatus = 'unpublished' | 'soldout' | 'published';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  inventory: number;

  @Column()
  price: number;

  @Column()
  sold: number;

  @Column()
  category: string;

  @Column()
  location: string;

  @Column()
  imageurl: string;

  @Column({
    type: 'enum',
    enum: ['unpublished', 'soldout', 'published'],
    default: 'unpublished',
  })
  status: VoucherStatus;

  @ManyToOne(() => Store, (store) => store.vouchers)
  store: Store;
}
