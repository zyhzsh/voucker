import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type OrderStatus = 'created' | 'cancelled' | 'pennding' | 'completed';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  voucher_id: number;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ['created', 'cancelled', 'pennding', 'completed'],
    default: 'pennding',
  })
  status: OrderStatus;

  @Column()
  voucher_name: string;

  @Column()
  voucher_imageurl: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
