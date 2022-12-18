import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrderModule } from './../src/order.module';
// import { ClientProxy, Transport } from '@nestjs/microservices';
// import { INVENTORY_SERVICE } from '../constants/services';
// import { RmqModule } from '../../../libs/common/src/rmq/rmq.module';
// import { RmqService } from '../../../libs/common/src/rmq/rmq.service';
describe('Order (e2e)', () => {
  let app: INestApplication;
  //let client: ClientProxy;
  // Refer https://stackoverflow.com/questions/57315466/e2e-testing-a-microservice-in-nest
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    //const rmqService = app.get<RmqService>(RmqService);
    //app.connectMicroservice(rmqService.getOptions('ORDER'));
    //await app.startAllMicroservices();
    app.startAllMicroservices();
    await app.init();
    // await client.connect();
  });

  afterAll(async () => {
    await app.close();
    //  client.close();
  });

  it('/ Health Check (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('OK');
  });

  it('/ Fetching my orders (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/order/myorder/google-oauth2|114335679009072858418')
      .expect(200);
  });

  it('/ User place an order (POST)', () => {
    const testOrder = {
      user_id: 'XXXXX',
      voucher_id: 1,
      voucher_name: 'testVoucher',
      voucher_imageurl:
        'https://i.picsum.photos/id/1025/400/400.jpg?hmac=_2oZYpLHcHJehF3LYK08Mf1HPKtKuutvr55PPD0H0fg',
      voucher_description: 'blablablabla,blablablabla,bla,bla',
      price: 999,
    };
    return request(app.getHttpServer())
      .post('/api/order')
      .send(testOrder)
      .expect(201);
  });
});
