import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    IsOptional,
} from "class-validator"

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsEmail()
    customerEmail: string;

    @IsString()
    @IsNotEmpty()
    customerPhone: string;

    @IsUUID()
    serviceId: string;

    @IsDateString()
    bookingDate: string;

    @IsString()
    @IsNotEmpty()
    bookingTime: string;

    @IsOptional()
    @IsString()
    notes?: string;
}