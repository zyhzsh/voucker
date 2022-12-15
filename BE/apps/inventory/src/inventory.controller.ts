import { RmqService } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { OrderCreatedDto } from './dto/order-created.dto';
import { InventoryService } from './inventory.service';

@Controller('api/inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_created')
  async orderCreated(
    @Payload() newOrder: OrderCreatedDto,
    @Ctx() context: RmqContext,
  ) {
    await this.inventoryService.validateNewOrder(newOrder);
    this.rmqService.ack(context);
  }

  @EventPattern('voucher_published')
  async voucherPublished(@Payload() data: any, @Ctx() context: RmqContext) {
    // this.inventoryService
    console.log(data);
    this.rmqService.ack(context);
  }
}
