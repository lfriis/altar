"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const server = (0, express_1.default)();
/**
 * ? Middleware
 */
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)({ credentials: true, origin: config_1.serverConfig.front_end_url }));
server.use((0, helmet_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use('/api', routes_1.default);
server.use(middleware_1.errorHandler);
server.use(middleware_1.loggingMiddlware);
/**
 * ? Server deployment
 */
server
    .listen(config_1.serverConfig.port, () => {
    utils_1.logger.info({
        namespace: config_1.serverConfig.namespace,
        message: `${config_1.serverConfig.environment} server listening @ http://${config_1.serverConfig.hostname}:${config_1.serverConfig.port}`,
    });
})
    .on('error', (err) => {
    utils_1.logger.error({
        namespace: config_1.serverConfig.namespace,
        message: 'Error deploying server',
        object: err,
    });
});
/**
 * ? Error handling to help with unhandled rejection
 */
process
    .on('SIGINT', () => {
    process.exit();
})
    .on('unhandledRejection', (reason, p) => {
    console.log(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', (err) => {
    console.log(err, 'Uncaught Exception thrown');
    process.exit(1);
});
