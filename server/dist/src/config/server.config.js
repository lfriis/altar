"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const package_json_1 = require("../../package.json");
dotenv.config();
const server = {
    environment: process.env.ENVIRONMENT,
    namespace: 'SERVER',
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT,
    front_end_url: process.env.FRONT_END_URL,
    jwt_token: process.env.JWT_TOKEN,
    autoauth_jwt_token: process.env.AUTOAUTH_JWT_TOKEN,
    app_passphrase: process.env.APP_PASSPHRASE,
    version: package_json_1.version,
};
exports.default = server;
