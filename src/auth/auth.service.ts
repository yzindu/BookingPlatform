import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });
        return this.buildAuthResponse(user.id, user.email, user.name);
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const matches = await bcrypt.compare(dto.password, user.password);
        if (!matches) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return this.buildAuthResponse(user.id, user.email, user.name);
    }

    private async buildAuthResponse(userId: string, email: string, name: string) {
        const payload: JwtPayload = { sub: userId, email };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            accessToken,
            user: { id: userId, email, name },
        };
    }
}