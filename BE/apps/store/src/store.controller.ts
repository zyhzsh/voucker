import { RmqService } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { StoreService } from './store.service';

@Controller()
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('voucher_created')
  async text(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('store-side:', data);
    this.rmqService.ack(context);
  }
  @Get()
  test() {
    return 'sdsd';
  }
}
