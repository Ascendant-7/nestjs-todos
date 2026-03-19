import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiptDto } from './create-receipt.dto';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {
    @IsOptional()
    @IsDateString()
    issuedAt?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}
