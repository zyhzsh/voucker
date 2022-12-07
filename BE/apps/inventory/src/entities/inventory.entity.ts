import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryColumn()
  voucher_id: number;

  @Column()
  inventory: number;
}
