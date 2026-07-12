import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus } from './enums/booking-status.enum';
import { ServicesService } from '../services/services.service';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingsRepository: Repository<Booking>,
        private readonly servicesService: ServicesService,
    ) { }

    async create(dto: CreateBookingDto) {
        // A booking must belong to an existing service.
        // if service does not exsit findone() throws exception 
        const service = await this.servicesService.findOne(dto.serviceId);

        // Booking dates cannot be in the past.
        // compare the booking date to current date time
        const bookingDateTime = new Date(`${dto.bookingDate}T${dto.bookingTime}:00`);
        if (bookingDateTime.getTime() < Date.now()) {
            throw new BadRequestException('Booking date and time cannot be in the past');
        }

        const booking = this.bookingsRepository.create({
            ...dto,
            service,
            status: BookingStatus.PENDING,
        });
        return this.bookingsRepository.save(booking);
    }

    findAll() {
        return this.bookingsRepository.find({ order: { bookingDate: 'DESC' } });
    }

    async findOne(id: string) {
        const booking = await this.bookingsRepository.findOne({ where: { id } });
        if (!booking) {
            throw new NotFoundException(`Booking with id "${id}" not found`);
        }
        return booking;
    }

    async updateStatus(id: string, dto: UpdateBookingStatusDto) {
        const booking = await this.findOne(id);

        // Cancelled bookings cannot be marked as completed.
        // check if booking canceled and new status is completed or not
        if (booking.status === BookingStatus.CANCELLED && dto.status === BookingStatus.COMPLETED) {
            throw new BadRequestException('A cancelled booking cannot be marked as completed');
        }

        booking.status = dto.status;
        return this.bookingsRepository.save(booking);
    }

    async cancel(id: string) {
        const booking = await this.findOne(id);
        booking.status = BookingStatus.CANCELLED;
        return this.bookingsRepository.save(booking);
    }
}