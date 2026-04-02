import { IsDateString, IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateReceiptDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0)
    price: number;
}
