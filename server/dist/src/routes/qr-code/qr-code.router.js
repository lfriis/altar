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
exports.qrCodeRouter = void 0;
/**
 * ? Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
const config_1 = require("../../config");
exports.qrCodeRouter = express_1.default.Router();
exports.default = exports.qrCodeRouter;
/**
 * ? Controller Definitions
 */
exports.qrCodeRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authClientObject = yield utils_1.GoogleSheetsService.authenticate();
        const googleSheetsInstance = yield utils_1.GoogleSheetsService.generateInstance(authClientObject);
        // Fetch Existing Sheets Data
        const sheetsData = yield utils_1.GoogleSheetsService.getData({
            auth: authClientObject,
            googleSheetsInstance,
            spreadsheetId: config_1.googleConfig.sheetId,
            sheetName: 'Guest List',
            range: 'A:N',
        });
        const updatedGuestInfo = sheetsData.map((guest) => (Object.assign(Object.assign({}, guest), { encrypted_address: `http://10.0.0.187:3000/?query=${(0, utils_1.generateJWTToken)({ address: guest.address })}` })));
        return res.status(200).json({ updatedGuestInfo });
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
}));
