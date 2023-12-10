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
exports.getAllUsers = exports.getUserByEmail = exports.createUser = void 0;
const database_1 = require("../lib/database");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.databaseConnection.collection('USERS').insertOne(user);
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.databaseConnection.collection('USERS').findOne({ email });
});
exports.getUserByEmail = getUserByEmail;
const getAllUsers = (sortCreatedAscending = true) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield database_1.databaseConnection
        .collection('USERS')
        .find({})
        .sort({ createdAt: sortCreatedAscending ? 1 : -1 })
        .toArray(); // As it's a coding test, no pagination neither limit added
    return userList;
});
exports.getAllUsers = getAllUsers;
