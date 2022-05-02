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
exports.guestsRouter = void 0;
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/**
 * ? Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const utils_1 = require("../../utils");
exports.guestsRouter = express_1.default.Router();
exports.default = exports.guestsRouter;
/**
 * ? Controller Definitions
 */
exports.guestsRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, address } = req.body;
    let searchAddressKey;
    if (query) {
        const decodedToken = (jsonwebtoken_1.default.verify(query, config_1.serverConfig.jwt_token));
        searchAddressKey = decodedToken.address;
    }
    else if (address) {
        searchAddressKey = address;
    }
    else {
        return res.status(400).send({
            message: 'Please provide a query or address.',
        });
    }
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
        // Filter Sheet Data by Address
        const guestInfo = utils_1.GoogleSheetsService.filterData(sheetsData, 'address', searchAddressKey);
        if (!guestInfo) {
            return res.status(404).send({
                message: 'There is no record with that address, please try again. If this issue persists, reach out to Jillian or Larsen.',
            });
        }
        const guestFoodSelectionData = yield utils_1.GoogleSheetsService.getData({
            auth: authClientObject,
            googleSheetsInstance,
            spreadsheetId: config_1.googleConfig.sheetId,
            sheetName: 'Guest Food Selections',
            range: 'A:F',
        });
        const guestsFoodSelectionsExist = guestInfo.names.some((guestName) => {
            const foundGuestSelections = guestFoodSelectionData.filter((g) => g.name === guestName);
            return foundGuestSelections.length > 0;
        });
        return res.status(200).json({
            message: 'Retrieved Guest Information',
            guestInfo,
            guestsFoodSelectionsExist,
        });
    }
    catch (e) {
        return next(e);
    }
}));
exports.guestsRouter.post('/rsvp', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { guests, guestInfo } = req.body;
    try {
        const authClientObject = yield utils_1.GoogleSheetsService.authenticate();
        const googleSheetsInstance = yield utils_1.GoogleSheetsService.generateInstance(authClientObject);
        const guestFoodSelectionData = yield utils_1.GoogleSheetsService.getData({
            auth: authClientObject,
            googleSheetsInstance,
            spreadsheetId: config_1.googleConfig.sheetId,
            sheetName: 'Guest Food Selections',
            range: 'A:F',
        });
        for (let i = 0; i < guests.length; i++) {
            const guest = guests[i];
            if (guest.name === 'plus 1')
                return;
            const guestFoodSelectionIndex = guestFoodSelectionData.findIndex((g) => g.name === guest.name);
            if (guestFoodSelectionIndex === -1) {
                yield utils_1.GoogleSheetsService.addFoodData({
                    auth: authClientObject,
                    googleSheetsInstance,
                    spreadsheetId: config_1.googleConfig.sheetId,
                    sheetName: 'Guest Food Selections',
                    foodSelection: guest,
                });
            }
            else {
                yield utils_1.GoogleSheetsService.updateFoodData({
                    auth: authClientObject,
                    googleSheetsInstance,
                    spreadsheetId: config_1.googleConfig.sheetId,
                    sheetName: 'Guest Food Selections',
                    range: `A${guestFoodSelectionIndex + 2}`,
                    foodSelection: guest,
                });
            }
        }
        if (guestInfo.songRequests.length > 0) {
            for (let i = 0; i < guestInfo.songRequests.length; i++) {
                const song = guestInfo.songRequests[i];
                yield utils_1.GoogleSheetsService.addSongData({
                    auth: authClientObject,
                    googleSheetsInstance,
                    spreadsheetId: config_1.googleConfig.sheetId,
                    sheetName: 'Song Requests',
                    song,
                });
            }
        }
        return res
            .status(200)
            .json({ message: 'RSVP successfully saved!' });
    }
    catch (e) {
        return next(e);
    }
}));
