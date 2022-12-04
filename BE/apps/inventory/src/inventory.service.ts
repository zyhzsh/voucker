import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ORDER_SERVICE,
  STORE_SERVICE,
  VOUCHER_SERVICE,
} from '../constants/services';
import { OrderCreatedDto } from './dto/order-created.dto';
import { Invenotry } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Invenotry)
    private readonly inventoryRepository: Repository<Invenotry>,
    @Inject(VOUCHER_SERVICE) private voucherClient: ClientProxy,
    @Inject(STORE_SERVICE) private storeClient: ClientProxy,
    @Inject(ORDER_SERVICE) private orderClient: ClientProxy,
  ) {}

  async validateNewOrder(newOrder: OrderCreatedDto) {
    const { voucher_id, id } = newOrder;
    const voucher = await this.inventoryRepository.findOneBy({ voucher_id });
    if (voucher && voucher.inventory >= 1) {
      await this.inventoryRepository.update(
        { voucher_id },
        { inventory: voucher.inventory - 1 },
      );
      this.orderClient.emit('order_confirmed', id);
      //this.storeClient.emit('order_confirmed', voucher_id);
      //this.voucherClient.emit('inventory_updated', voucher_id);
    } else {
      this.orderClient.emit('inventory_', id);
    }
  }
}
