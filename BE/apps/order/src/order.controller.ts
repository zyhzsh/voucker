//import { AuthorizationGuard, PermissionsGuard, RmqService } from '@app/common';
// A better way to import "RmqModules" modules, but the test file can't import it,Therefire comment this out
import { RmqService } from '../../../libs/common/src/rmq/rmq.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_confirmed')
  orderConfirmed(@Payload() id: string, @Ctx() context: RmqContext) {
    this.orderService.confirmOrder(id);
    this.rmqService.ack(context);
  }

  @EventPattern('order_confirm_failed')
  orderConfirmFailed(@Payload() id: string, @Ctx() context: RmqContext) {
    this.orderService.cancelOrder(id);
    this.rmqService.ack(context);
  }

  @Get('/myorder/:id')
  getMyOrders(@Param('id') user_id: string) {
    return this.orderService.getMyOrders(user_id);
  }

  @Post()
  //@UseGuards(AuthorizationGuard, PermissionsGuard)
  placeOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }
}
