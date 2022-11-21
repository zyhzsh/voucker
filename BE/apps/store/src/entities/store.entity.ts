import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Voucher } from './voucher.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  owner_id: string;

  @Column()
  imageurl: string;

  @Column()
  website: string;

  @Column()
  phone: string;

  @Column()
  store_id: string;

  @Column()
  category: string;

  @Column()
  location: string;

  @Column()
  address: string;

  @OneToMany(() => Voucher, (voucher) => voucher.store, { cascade: true })
  vouchers: Voucher[];
}
