import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userDto: RegisterUserDto;

  const prismaMock = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: vi.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userDto = {
      email: 'test@example.com',
      password: 'password123',
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    userDto = {
      ...userDto,
      email: 'test2@example.com',
    };
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      email: userDto.email,
      passwordHash: 'hashedpassword',
    });
    const user = await service.register(userDto);
    expect(user).toHaveProperty('email', userDto.email);
    expect(user).not.toHaveProperty('passwordHash');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: userDto.email,
      },
    });
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: userDto.email,
        passwordHash: expect.any(String),
      },
    });
  });

  it('should throw an error if the user already exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: userDto.email,
      passwordHash: 'hashedpassword',
    });
    await expect(service.register(userDto)).rejects.toThrow('User already exists');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: userDto.email,
      },
    });
  });
});
