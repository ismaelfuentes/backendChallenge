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
const create_1 = require("./create");
const users_1 = require("../../repositories/users");
const errors_1 = require("../../common/errors");
jest.mock('../../repositories/users');
const createUserDbMock = jest.fn();
const getUserByEmailMock = jest.fn();
describe('Services user create', () => {
    describe('checkEmailIsNotUsed function', () => {
        beforeAll(() => {
            users_1.getUserByEmail.mockImplementation(getUserByEmailMock);
        });
        test('Exception triggered when there is another user with same email', () => __awaiter(void 0, void 0, void 0, function* () {
            getUserByEmailMock.mockResolvedValueOnce({});
            expect(() => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, create_1.checkEmailIsNotUsed)('anyEmail');
            })).rejects.toThrow(errors_1.ERRORS.EMAIL_IN_USE);
        }));
        test('No Exception triggered when there is not another user with same email', () => __awaiter(void 0, void 0, void 0, function* () {
            getUserByEmailMock.mockResolvedValueOnce(null);
            expect(() => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, create_1.checkEmailIsNotUsed)('anyEmail');
            })).not.toThrowError();
        }));
        test('repository requested with correct email address', () => __awaiter(void 0, void 0, void 0, function* () {
            getUserByEmailMock.mockResolvedValueOnce(null);
            yield (0, create_1.checkEmailIsNotUsed)('anyEmail');
            expect(getUserByEmailMock).toHaveBeenCalledWith('anyEmail');
        }));
    });
    describe('createUser service function', () => {
        // NOTE: I guess it doesn't make more sense to invest more time creating unit tests for this code challenge
        // as it's more similar code
    });
});
