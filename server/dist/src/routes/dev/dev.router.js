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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devRouter = void 0;
/**
 * ? Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const dev_service_1 = __importDefault(require("./dev.service"));
/**
 * ? Router Definition
 */
exports.devRouter = express_1.default.Router();
exports.default = exports.devRouter;
/**
 * ? Controller Definitions
 */
exports.devRouter.get('/gitInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gitInfo = (0, dev_service_1.default)();
        return res
            .status(200)
            .json({ message: 'Routes are healthy!', status: 'UP', gitInfo });
    }
    catch (e) {
        console.log(`${e}`);
        return res
            .status(400)
            .json({ message: 'Routes are unstable!', status: 'WARNING' });
    }
}));
