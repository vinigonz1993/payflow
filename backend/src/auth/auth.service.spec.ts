import bcrypt from 'bcrypt';
import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
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

  const jwtMock = {
    signAsync: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtMock,
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

  it('should throw an error if login user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    await expect(service.login({ email: userDto.email, password: userDto.password }))
      .rejects.toThrow('Invalid credentials');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: userDto.email,
      },
    });
  });

  it('should throw an error if login password is incorrect', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: userDto.email,
      passwordHash: 'hashedpassword',
    });
    await expect(service.login({ email: userDto.email, password: 'wrongpassword' }))
      .rejects.toThrow('Invalid credentials');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: userDto.email,
      },
    });
  });

  it('should return a JWT token upon successful login', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: userDto.email,
      passwordHash: bcrypt.hashSync(userDto.password, 10),
    });
    jwtMock.signAsync.mockResolvedValue('token');
    const result = await service.login({ email: userDto.email, password: userDto.password });
    expect(result.accessToken).toBeDefined();
    expect(typeof result.accessToken).toBe('string');
    expect(result).toHaveProperty('accessToken', 'token');
  });
});
