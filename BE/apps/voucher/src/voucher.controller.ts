// import { AuthorizationGuard, PermissionsGuard } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Patch,
  //Get,
  Post,
  Query,
  // SetMetadata,
  // UseGuards,
} from '@nestjs/common';
import { CreateVoucherRequest } from './dto/create-voucher.dto';
import { FindVoucherQuery } from './dto/find-voucher-query.dto';
import { GetAllVouchersQuery } from './dto/get-all-voucher-query.dto';
import { PublishVoucherRequest } from './dto/publish-voucher.dto';
import { VoucherService } from './voucher.service';

@Controller('api/voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  async createVoucher(@Body() request: CreateVoucherRequest) {
    return this.voucherService.createVoucher(request);
  }

  @Get()
  //TODO: add read:all Vouchers permission for Admin user here.
  async getAllVouchers(@Query() getAllVoucherQuery: GetAllVouchersQuery) {
    return this.voucherService.getAllVouchers(getAllVoucherQuery);
  }

  @Get('/published')
  async getAllPublishedVouchers(
    @Query() getAllVoucherQuery: GetAllVouchersQuery,
  ) {
    return this.voucherService.getAllPublishedVouchers(getAllVoucherQuery);
  }

  @Patch('/publish')
  async publishVoucher(@Query() publishVoucherQuery: PublishVoucherRequest) {
    return this.voucherService.publishVoucher(publishVoucherQuery);
  }

  @Get('/detail')
  async getVoucher(@Query() voucherId: FindVoucherQuery) {
    return this.voucherService.findOne(voucherId.id);
  }
}
