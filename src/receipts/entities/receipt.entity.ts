import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    receiptId: number;

    @Column()
    issuedAt: Date;

    @Column()
    name: string;

    @Column()
    price: number;
}
