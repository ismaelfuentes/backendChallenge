"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../../src/server");
const users_1 = require("../../../src/repositories/users");
const errors_1 = require("../../../src/common/errors");
globals_1.jest.mock('../../../src/repositories/users', () => ({
    createUser: globals_1.jest.fn(() => Promise.resolve()),
    getAllUsers: globals_1.jest.fn(() => Promise.resolve([])),
    getUserByEmail: globals_1.jest.fn(() => Promise.resolve(null)),
}));
const CORRECT_PARAMS = { name: 'john', email: 'john@jon.com' };
(0, globals_1.describe)('User creation endpoint', () => {
    let app;
    (0, globals_1.beforeAll)(() => {
        app = (0, server_1.buildServer)();
    });
    (0, globals_1.test)('create a new user with correct params should return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/users')
            .send(CORRECT_PARAMS);
        (0, globals_1.expect)(response.status).toEqual(201);
    }));
    (0, globals_1.test)('create a new user without email should return 400 error', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/users').send({ name: 'john' });
        (0, globals_1.expect)(response.status).toEqual(400);
        (0, globals_1.expect)(response.body).toEqual({
            email: { location: 'body', msg: 'Invalid value', path: 'email', type: 'field' },
        });
    }));
    (0, globals_1.test)('create a new user with wrong email should return 400 error', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({ name: 'john', email: 'badEmail' });
        (0, globals_1.expect)(response.status).toEqual(400);
        (0, globals_1.expect)(response.body).toEqual({
            email: {
                location: 'body',
                msg: 'Invalid value',
                path: 'email',
                type: 'field',
                value: '@bademail',
            },
        });
    }));
    (0, globals_1.test)('create a new user without name should return 400 error', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/users').send({ email: 'john@jon.com' });
        (0, globals_1.expect)(response.status).toEqual(400);
        (0, globals_1.expect)(response.body).toEqual({
            name: { location: 'body', msg: 'Invalid value', path: 'name', type: 'field' },
        });
    }));
    (0, globals_1.test)('should return error if email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        users_1.getUserByEmail.mockResolvedValueOnce({ _id: 123 });
        const response = yield (0, supertest_1.default)(app).post('/users').send(CORRECT_PARAMS);
        (0, globals_1.expect)(response.status).toEqual(409);
        (0, globals_1.expect)(response.body).toEqual({ errorCode: errors_1.ERRORS.EMAIL_IN_USE, msg: 'Email already in use' });
    }));
});
