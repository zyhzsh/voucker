import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_SERVICE } from '../constants/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(INVENTORY_SERVICE) private inventoryClient: ClientProxy,
  ) {}

  getMyOrders(user_id: string) {
    return this.orderRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });
  }

  async createOrder(newOrder: CreateOrderDto) {
    let result;
    try {
      const order = this.orderRepository.create(newOrder);
      result = await this.orderRepository.save(order);
      this.inventoryClient.emit('order_created', result);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async confirmOrder(order_id: string) {
    this.orderRepository.update({ id: order_id }, { status: 'created' });
  }

  async cancelOrder(order_id: string) {
    this.orderRepository.update({ id: order_id }, { status: 'cancelled' });
  }
}
