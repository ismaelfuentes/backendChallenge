"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = require("./create");
const getAll_1 = require("./getAll");
const utils_1 = require("../../common/utils");
const router = express_1.default.Router();
router.post('', (0, create_1.createUserValidation)(), utils_1.checkValidationErrors, create_1.createUserHandler);
router.get('', (0, getAll_1.getAllUsersValidation)(), utils_1.checkValidationErrors, getAll_1.getAllUsers);
exports.default = router;
