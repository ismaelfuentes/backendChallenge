"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const checkValidationErrors = (req, res, next) => {
    var err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        res.status(400).send(err.mapped());
    }
    else {
        next();
    }
};
exports.checkValidationErrors = checkValidationErrors;
