import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
