import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { BookingStatus } from '../enums/booking-status.enum';

@Entity('bookings')
@Index(['serviceId', 'bookingDate', 'bookingTime'])
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerName: string;

    @Column()
    customerEmail: string;

    @Column()
    customerPhone: string;

    @Column()
    serviceId: string;

    @ManyToOne(() => Service, (service) => service.bookings, {
        onDelete: 'RESTRICT',
        eager: true,
    })
    @JoinColumn({ name: 'serviceId' })
    service: Service;

    @Column({ type: 'date' })
    bookingDate: string;

    @Column({ type: 'varchar' })
    bookingTime: string;

    @Column({ type: 'varchar', default: BookingStatus.PENDING })
    status: BookingStatus;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}