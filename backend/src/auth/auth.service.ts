import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Body, Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async register(@Body() body: RegisterUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const passwordHash = await bcrypt.hash(body.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: body.email,
                passwordHash: passwordHash,
            },
        });

        const { passwordHash: _, ...safeUser } = user;
        return safeUser;
    }

    async login(@Body() body: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            body.password,
            user.passwordHash
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });
        return { accessToken };
    }
}
