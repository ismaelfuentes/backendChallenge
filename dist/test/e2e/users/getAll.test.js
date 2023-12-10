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
globals_1.jest.mock('../../../src/repositories/users', () => ({
    getAllUsers: globals_1.jest.fn(() => Promise.resolve([])),
}));
(0, globals_1.describe)('User creation endpoint', () => {
    let app;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        app = (0, server_1.buildServer)();
    }));
    (0, globals_1.test)('read users return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/users');
        (0, globals_1.expect)(response.status).toEqual(200);
    }));
    (0, globals_1.test)('read users respond the given list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = [
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
        users_1.getAllUsers.mockResolvedValueOnce(users);
        const response = yield (0, supertest_1.default)(app).get('/users');
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toEqual(users);
    }));
    (0, globals_1.test)('read users respond 500 if something fails and expected message', () => __awaiter(void 0, void 0, void 0, function* () {
        users_1.getAllUsers.mockImplementationOnce(() => {
            throw new Error();
        });
        const response = yield (0, supertest_1.default)(app).get('/users');
        (0, globals_1.expect)(response.status).toEqual(500);
        (0, globals_1.expect)(response.body).toEqual({ msg: "server error, contact fastAndShortCodingChallenge@ismaelFuentes.com for support" });
    }));
});
