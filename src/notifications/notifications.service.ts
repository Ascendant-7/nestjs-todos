import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class NotificationsService {
  constructor(@Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService) {}

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  notify(event: string, payload: any) {
    console.log(`[NOTIFY] ${event}`, payload);
    return { ok: true };
  }
}
