import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { INVENTORY_SERVICE } from '../constants/services';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) =>
    Promise.resolve({ id: Math.floor(Math.random() * 11), ...entity }),
  ),
}));

describe('OrderService', () => {
  let service: OrderService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: repositoryMockFactory,
        },
        {
          provide: INVENTORY_SERVICE,
          useValue: ClientProxy,
        },
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
