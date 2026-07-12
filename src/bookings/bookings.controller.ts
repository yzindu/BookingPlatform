import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new booking' })
    create(@Body() dto: CreateBookingDto) {
        return this.bookingsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    findAll() {
        return this.bookingsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a booking by id' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookingsService.findOne(id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update a booking status' })
    updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateBookingStatusDto) {
        return this.bookingsService.updateStatus(id, dto);
    }

    @Patch(':id/cancel')
    @ApiOperation({ summary: 'Cancel a booking' })
    cancel(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookingsService.cancel(id);
    }
}