import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new service' })
    create(@Body() dto: CreateServiceDto) {
        return this.servicesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all services' })
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a service by id' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.servicesService.findOne(id);
    }

    @Put(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a service by id' })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateServiceDto) {
        return this.servicesService.update(id, dto);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a service by id' })
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.servicesService.remove(id);
    }
}