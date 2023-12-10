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
exports.createUserHandler = exports.createUserValidation = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../../common/errors");
const create_1 = require("../../services/user/create");
const createUserValidation = () => {
    return [
        (0, express_validator_1.body)('email').exists().notEmpty().normalizeEmail().trim().isEmail(),
        (0, express_validator_1.body)('name').exists().notEmpty().trim()
    ];
};
exports.createUserValidation = createUserValidation;
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        yield (0, create_1.createUser)({ email, name });
        res.status(201).send();
    }
    catch (error) {
        // NOTE just quick error handler
        switch (error.message) {
            case errors_1.ERRORS.EMAIL_IN_USE:
                res.status(409).send({ errorCode: errors_1.ERRORS.EMAIL_IN_USE, msg: 'Email already in use' });
                break;
            default:
                //NOTE: In a real app it's not a good practice to let the error keep going but for this test... we can talk about it
                throw error;
        }
    }
});
exports.createUserHandler = createUserHandler;
