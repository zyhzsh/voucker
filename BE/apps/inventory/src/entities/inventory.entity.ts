import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Invenotry {
  @PrimaryColumn()
  voucher_id: number;

  @Column()
  inventory: number;
}
