import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 40, nullable: true })
    firstName: string;

    @Column({ name: 'last_name', length: 40, nullable: true })
    lastName: string;

    @Column({ length: 255, nullable: true })
    email: string;

    @Column({ name: 'phone_number', length: 15, nullable: true })
    phoneNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
