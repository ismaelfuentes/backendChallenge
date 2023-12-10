import { jest, describe, expect, test, beforeAll } from '@jest/globals';
import { Express } from 'express';
import request from 'supertest';

import { buildServer } from '../../../src/server';
import { getUserByEmail } from '../../../src/repositories/users';
import { ERRORS } from '../../../src/common/errors';

jest.mock('../../../src/repositories/users', () => ({
    createUser: jest.fn(() => Promise.resolve()),
    getAllUsers: jest.fn(() => Promise.resolve([])),
    getUserByEmail: jest.fn(() => Promise.resolve(null)),
}));

const CORRECT_PARAMS = { name: 'john', email: 'john@jon.com' }

describe('User creation endpoint', () => {
    let app: Express;

    beforeAll(() => {
        app = buildServer();
    });

    test('create a new user with correct params should return 201', async () => {
        const response = await request(app)
            .post('/users')
            .send(CORRECT_PARAMS);
        expect(response.status).toEqual(201);
    });

    test('create a new user without email should return 400 error', async () => {
        const response = await request(app).post('/users').send({ name: 'john' });
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({
            email: { location: 'body', msg: 'Invalid value', path: 'email', type: 'field' },
        });
    });

    test('create a new user with wrong email should return 400 error', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'john', email: 'badEmail' });
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({
            email: {
                location: 'body',
                msg: 'Invalid value',
                path: 'email',
                type: 'field',
                value: '@bademail',
            },
        });
    });

    test('create a new user without name should return 400 error', async () => {
        const response = await request(app).post('/users').send({ email: 'john@jon.com' });
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({
            name: { location: 'body', msg: 'Invalid value', path: 'name', type: 'field' },
        });
    });


    test('should return error if email already exists', async () => {
      (getUserByEmail as jest.Mock<any>).mockResolvedValueOnce({_id: 123});
      const response = await request(app).post('/users').send(CORRECT_PARAMS);
      expect(response.status).toEqual(409);
      expect(response.body).toEqual({ errorCode: ERRORS.EMAIL_IN_USE, msg: 'Email already in use'});
  });
});
