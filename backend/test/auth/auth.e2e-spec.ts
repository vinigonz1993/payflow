import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { AppModule } from '../../src/app.module.js';
import { PrismaService } from '../../src/prisma/prisma.service.js';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    const prisma = app.get(PrismaService);
    const password = 'password123';
    const email = 'test@test.com';
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should create a user', async () => {
    const email = 'newuser@test.com';
    const password = 'password123';
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: email,
        password: password,
      })
      .expect(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(email);
  });

  it('Should not create a user with an existing email', async () => {
    const email = 'test@test.com';
    const password = 'password123';
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: email,
        password: password,
      })
      .expect(409);
  });

  it('Should login a user with valid credentials', async () => {
    const data = { email: 'test@test.com', password: 'password123' }
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(201);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('Should not login a user with invalid credentials', async () => {
    const data = { email: 'test@test.com', password: 'wrongpassword' }
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(401);
  });

  it('Should not login a user with non-existing email', async () => {
    const data = { email: 'nonexisting@test.com', password: 'password123' }
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(401);
  });
});