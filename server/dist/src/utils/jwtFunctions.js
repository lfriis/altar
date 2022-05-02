"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function generateJWTToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, config_1.serverConfig.jwt_token);
    return token;
}
exports.default = generateJWTToken;
