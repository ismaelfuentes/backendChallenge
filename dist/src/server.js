"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./controllers/routes");
const buildServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)()).use(express_1.default.json()).options('*', (0, cors_1.default)());
    (0, routes_1.initRoutes)(app);
    return app;
};
exports.buildServer = buildServer;
