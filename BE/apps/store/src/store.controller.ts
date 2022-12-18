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
import { Voucher } from './entities/voucher.entity';
import { StoreService } from './store.service';

@Controller('api/store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('voucher_published')
  async voucherPublished(
    @Payload() voucher: Voucher,
    @Ctx() context: RmqContext,
  ) {
    const { id } = voucher;
    console.log('store-side:', voucher);
    await this.storeService.publishVoucher(id);
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
