import { AuthorizationGuard, PermissionsGuard, RmqService } from '@app/common';
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

  @Get('/myorder/:id')
  getMyOrders(@Param('id') user_id: string) {
    return this.orderService.getMyOrders(user_id);
  }

  @Post()
  // @UseGuards(AuthorizationGuard, PermissionsGuard)
  placeOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }
}
