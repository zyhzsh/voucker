import {
  //Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { Voucher } from './entities/voucher.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>, // @Inject(VOUCHER_SERVICE) private voucherClient: ClientProxy, // private readonly voucherRepository: Repository<Voucher>,
  ) {}
  async getMyStores(vendorId: string) {
    return this.storeRepository.find({
      relations: { vouchers: true },
      where: {
        owner_id: vendorId,
      },
    });
  }
  async getMyVouchers(vendorId: string) {
    return await this.voucherRepository.find({
      relations: { store: false },
      where: {
        store: {
          owner_id: vendorId,
        },
      },
    });
  }
}
