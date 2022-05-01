"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const utils_1 = require("../utils");
function logging(req, res, next) {
    utils_1.logger.info({
        namespace: config_1.serverConfig.namespace,
        message: `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
    });
    res.on('finish', () => {
        utils_1.logger.info({
            namespace: config_1.serverConfig.namespace,
            message: `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
        });
    });
    next();
}
exports.default = logging;
