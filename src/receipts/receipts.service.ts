import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './entities/receipt.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notifications: NotificationsService,
  ) {}

  async create(createReceiptDto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      issuedAt: new Date(Date.now()),
      name: createReceiptDto.name,
      price: createReceiptDto.price,
    });
    const saved = await this.receiptRepo.save(receipt);

    this.notifications.notify('receipt_created', {
      receiptId: saved.receiptId,
      price: saved.price
    })

    return saved;
  }

  async findAll() {
    return this.receiptRepo.find({ order: { issuedAt: 'DESC'}});
  }

  async findOne(receiptId: number) {
    const receipt = await this.receiptRepo.findOne( { where: { receiptId } });
    if (!receipt) throw new NotFoundException('Receipt Not Found');
    return receipt;
  }

  async update(receiptId: number, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(receiptId);
    
    if (dto.issuedAt !== undefined) receipt.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;
  }

  async remove(receiptId: number) {
    const receipt = await this.findOne(receiptId);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, receiptId };
  }
}
