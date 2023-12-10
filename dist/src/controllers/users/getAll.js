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
exports.getAllUsers = exports.getAllUsersValidation = void 0;
const express_validator_1 = require("express-validator");
const getAll_1 = require("../../services/user/getAll");
const getAllUsersValidation = () => {
    return [(0, express_validator_1.query)('created').optional().isInt().isIn([-1, 1])];
};
exports.getAllUsersValidation = getAllUsersValidation;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = parseInt(req.query.created) || 1;
        const users = yield (0, getAll_1.getAll)(created == 1);
        res.status(200).send(users);
    }
    catch (error) {
        //NOTE: just fast way to log and not expose server errors information to the client, not the real production way
        console.error(error);
        res.status(500).send({
            msg: 'server error, contact fastAndShortCodingChallenge@ismaelFuentes.com for support',
        });
    }
});
exports.getAllUsers = getAllUsers;
