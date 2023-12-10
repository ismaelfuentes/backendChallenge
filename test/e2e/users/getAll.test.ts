import { jest, describe, expect, test, beforeAll } from '@jest/globals';
import { Express } from 'express';
import request from 'supertest';

import { buildServer } from '../../../src/server';
import { getAllUsers } from '../../../src/repositories/users';

jest.mock('../../../src/repositories/users', () => ({
    getAllUsers: jest.fn(() => Promise.resolve([])),
}));

describe('User creation endpoint', () => {
    let app: Express;

    beforeAll(async () => {
        app = buildServer();
    });

    test('read users return 200', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toEqual(200);
    });

    test('read users respond the given list of users', async () => {
        const users: any = [
            {
                _id: 123,
                name: 'test1',
                email: 'test1',
                createdAt: new Date().toDateString(),
            },
            {
                _id: 2222,
                name: 'test2',
                email: 'test2',
                createdAt: new Date().toDateString(),
            },
        ];
        
        (getAllUsers as jest.Mock<any>).mockResolvedValueOnce(users);
        const response = await request(app).get('/users');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(users);
    });

    test('read users respond 500 if something fails and expected message', async () => {
        (getAllUsers as jest.Mock).mockImplementationOnce(() => {
            throw new Error();
        });
        const response = await request(app).get('/users');
        expect(response.status).toEqual(500);
        expect(response.body).toEqual({ msg: "server error, contact fastAndShortCodingChallenge@ismaelFuentes.com for support"});
    });
});
