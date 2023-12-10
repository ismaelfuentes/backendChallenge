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
exports.checkEmailIsNotUsed = exports.createUser = void 0;
const errors_1 = require("../../common/errors");
const users_1 = require("../../repositories/users");
const createUser = ({ name, email }) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.checkEmailIsNotUsed)(email);
    const createdAt = new Date();
    yield (0, users_1.createUser)({ name, email, createdAt });
});
exports.createUser = createUser;
// NOTE: Probably we could move it upwards to reuse it but so far only used once yagni ;)
const checkEmailIsNotUsed = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const previousUser = yield (0, users_1.getUserByEmail)(email);
    if (previousUser != null) {
        // NOTE: For a production app we would extend Error instead of using the error message (for multiple reasons) but for this project i think this is enough
        throw new Error(errors_1.ERRORS.EMAIL_IN_USE);
    }
});
exports.checkEmailIsNotUsed = checkEmailIsNotUsed;
