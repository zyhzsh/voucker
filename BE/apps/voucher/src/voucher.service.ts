import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { STORE_SERVICE } from '../constants/services';
import { CreateVoucherRequest } from './dto/create-voucher.dto';
import { GetAllVouchersQuery } from './dto/get-all-voucher-query.dto';
import { Store } from './entities/store.entity';
import { Voucher } from './entities/voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(Store)
    private readonly storeRepostiry: Repository<Store>,
    @Inject(STORE_SERVICE) private storeClient: ClientProxy,
  ) {}

  async createVoucher(request: CreateVoucherRequest) {
    console.log('voucher-side:', request);
    return request;
    // return this.voucherRepository.create(request);
  }

  async getAllVouchers(getAllVoucherQuery: GetAllVouchersQuery) {
    const { limit, offset, category, location } = getAllVoucherQuery;
    return this.voucherRepository.find({
      relations: ['store'],
      where: {
        category: category ? ILike(`%${category.toLowerCase()}%`) : Like(`%`),
        location: location ? ILike(`%${location.toLowerCase()}%`) : Like(`%`),
      },
      skip: offset,
      take: limit,
    });
  }

  async getAllPublishedVouchers(getAllVoucherQuery: GetAllVouchersQuery) {
    const { limit, offset, category, location, search } = getAllVoucherQuery;
    return this.voucherRepository.find({
      where: {
        name: search ? ILike(`%${search}%`) : Like(`%`),
        status: 'published',
        category: category ? ILike(`%${category}%`) : Like(`%`),
        location: location ? ILike(`%${location}%`) : Like(`%`),
      },
      skip: offset,
      take: limit,
    });
  }
  async findOne(id: number) {
    return this.voucherRepository.findOne({
      relations: ['store'],
      where: { id },
    });
  }
}
