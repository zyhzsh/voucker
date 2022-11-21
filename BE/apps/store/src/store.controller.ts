import { AuthorizationGuard, PermissionsGuard, RmqService } from '@app/common';
//import { GetUserId } from '@app/common/auth/authHandler';
import {
  //Headers,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { StoreService } from './store.service';

@Controller('api/store')
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

  // Get Vendor's Store
  @Get('/mystores/:id')
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  getStores(@Param('id') id: string) {
    return this.storeService.getMyStores(id);
  }

  // Get Vendor's Voucher's
  @Get('/myvouchers/:id')
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  getVouchers(@Param('id') id: string) {
    return this.storeService.getMyVouchers(id);
  }
}
