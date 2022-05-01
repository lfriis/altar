"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../config");
const dev_router_1 = __importDefault(require("./dev/dev.router"));
const guests_router_1 = __importDefault(require("./guests/guests.router"));
const spotify_router_1 = __importDefault(require("./spotify/spotify.router"));
const qr_code_router_1 = __importDefault(require("./qr-code/qr-code.router"));
const routes = (0, express_1.Router)();
routes.use('/guests', guests_router_1.default);
routes.use('/spotify', spotify_router_1.default);
/**
 * ? Deploying dev endpoint
 */
if (config_1.serverConfig.environment === 'DEVELOPMENT') {
    routes.use('/dev', dev_router_1.default);
    routes.use('/qr-code', qr_code_router_1.default);
}
exports.default = routes;
