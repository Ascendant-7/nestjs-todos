import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
    @Inject(forwardRef(() => NotificationsService)) private readonly notifications: NotificationsService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  createOrder(orderDto: any) {
    this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

    this.notifications.notify('order_created', { order: orderDto });

    return { status: 'Order accepted', order: orderDto };
  }
}
