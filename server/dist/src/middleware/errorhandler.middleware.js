"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function errorHandler(error, req, res, next) {
    let status = 500;
    let message = 'Internal Server Error. If this persists, please contact Uberflip Support.';
    if (axios_1.default.isAxiosError(error)) {
        status = error.response.status;
        message = error
            .response.data.errors.map((_error) => _error.message)
            .join();
    }
    res.status(status).send({
        status,
        message,
    });
    next();
}
exports.default = errorHandler;
