import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    create(@Body() dto: CreateBookingDto) {
        return this.bookingsService.create(dto);
    }

    @Get()
    findAll() {
        return this.bookingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookingsService.findOne(id);
    }

    @Patch(':id/status')
    updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateBookingStatusDto) {
        return this.bookingsService.updateStatus(id, dto);
    }

    @Patch(':id/cancel')
    cancel(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookingsService.cancel(id);
    }
}