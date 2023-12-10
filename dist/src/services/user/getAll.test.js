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
Object.defineProperty(exports, "__esModule", { value: true });
const getAll_1 = require("./getAll");
const users_1 = require("../../repositories/users");
jest.mock('../../repositories/users');
const REPOSITORY_RESPONSE = [{
        _id: 123,
        name: "test",
        email: "emailTest@test.test"
    }];
const repositoryGetAllMock = jest.fn();
describe('getAll Service', () => {
    beforeAll(() => {
        users_1.getAllUsers.mockImplementation(repositoryGetAllMock);
    });
    beforeEach(() => {
        repositoryGetAllMock.mockReset();
    });
    test('repository requested with correct params when ordering ascending', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, getAll_1.getAll)(true);
        expect(repositoryGetAllMock).toHaveBeenCalledWith(true);
    }));
    test('repository requested with correct params when ordering descending', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, getAll_1.getAll)(false);
        expect(repositoryGetAllMock).toHaveBeenCalledWith(false);
    }));
    test('returns the appropriate list', () => __awaiter(void 0, void 0, void 0, function* () {
        repositoryGetAllMock.mockResolvedValueOnce(REPOSITORY_RESPONSE);
        const returnValue = yield (0, getAll_1.getAll)(false);
        expect(returnValue).toBe(REPOSITORY_RESPONSE);
    }));
});
