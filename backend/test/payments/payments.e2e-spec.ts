import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { AppModule } from '../../src/app.module.js';
import { PrismaService } from '../../src/prisma/prisma.service.js';
import TestAgent from 'supertest/lib/agent.js';

describe('Payments E2E', () => {
  let app: INestApplication;
  let token: string;
  let apiRequest: TestAgent;

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
    const email = 'e2e@test.com';
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
      },
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      });

    token = loginResponse.body.accessToken;
    expect(token).toBeDefined();
    apiRequest = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  const auth = (req: request.Test) => req.set('Authorization', `Bearer ${token}`);

  it('should reject creating a payment without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/payments')
      .send({
        amount: 100,
        currency: 'CAD',
        recipientId: 'recipient-123',
      })
      .expect(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should create a payment for the authenticated user', async () => {
    const response = await auth(apiRequest.post('/payments'))
      .send({
        amount: 100,
        currency: 'CAD',
        recipientId: 'recipient-123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.currency).toBe('CAD');
    expect(Number(response.body.amount)).toBe(100);
  });

  it('should return the authenticated user payments', async () => {
    const response = await auth(apiRequest.get('/payments'))
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should reject getting payments without authentication', async () => {
    await apiRequest.get('/payments')
      .expect(401);
  });

  it('should reject creating a payment with invalid token', async () => {
    await apiRequest.post('/payments')
      .set('Authorization', `Bearer invalidtoken`)
      .send({
        amount: 100,
        currency: 'CAD',
        recipientId: 'recipient-123',
      })
      .expect(401);
  });

  it('Should return a payment by Id', async () => {
    const createResponse = await auth(apiRequest.post('/payments'))
      .send({
        amount: 100,
        currency: 'CAD',
        recipientId: 'recipient-123',
      })
      .expect(201);

    const paymentId = createResponse.body.id;

    const response = await auth(apiRequest.get(`/payments/${paymentId}`))
      .expect(200);

    expect(response.body).toHaveProperty('id', paymentId);
    expect(response.body.currency).toBe('CAD');
    expect(Number(response.body.amount)).toBe(100);
  });
});