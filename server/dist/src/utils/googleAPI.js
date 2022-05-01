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
exports.filterData = exports.addSongData = exports.updateFoodData = exports.addFoodData = exports.getData = exports.generateInstance = exports.authenticate = void 0;
/* eslint-disable camelcase */
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
function convertToJSONArray(data) {
    const headers = data.shift();
    return data.map((row) => {
        let tempObj = {};
        row.forEach((value, j) => {
            tempObj = Object.assign(Object.assign({}, tempObj), { [headers[j]]: value.trim() });
        });
        return tempObj;
    });
}
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: path_1.default.join(__dirname, '../config/googleConfig.json'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        return auth.getClient();
    });
}
exports.authenticate = authenticate;
function generateInstance(authClientObject) {
    return __awaiter(this, void 0, void 0, function* () {
        return googleapis_1.google.sheets({ version: 'v4', auth: authClientObject });
    });
}
exports.generateInstance = generateInstance;
function getData({ auth, googleSheetsInstance, spreadsheetId, sheetName, range, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield googleSheetsInstance.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `${sheetName}!${range}`,
        });
        return convertToJSONArray(data.values);
    });
}
exports.getData = getData;
function addFoodData({ auth, googleSheetsInstance, spreadsheetId, sheetName, foodSelection, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const appendRequest = {
            auth,
            spreadsheetId,
            range: `${sheetName}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.name}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.main}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.vegan}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.glutenFree}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.other}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.confirmed}`,
                    ],
                ],
            },
        };
        yield googleSheetsInstance.spreadsheets.values.append(appendRequest);
    });
}
exports.addFoodData = addFoodData;
function updateFoodData({ auth, googleSheetsInstance, spreadsheetId, sheetName, range, foodSelection, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateRequest = {
            auth,
            spreadsheetId,
            range: `${sheetName}!${range}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.name}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.main}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.vegan}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.glutenFree}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.foodOption.other}`,
                        `${foodSelection === null || foodSelection === void 0 ? void 0 : foodSelection.confirmed}`,
                    ],
                ],
            },
        };
        yield googleSheetsInstance.spreadsheets.values.update(updateRequest);
    });
}
exports.updateFoodData = updateFoodData;
function addSongData({ auth, googleSheetsInstance, spreadsheetId, sheetName, song, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const appendRequest = {
            auth,
            spreadsheetId,
            range: `${sheetName}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [`${song === null || song === void 0 ? void 0 : song.name}`, `${song === null || song === void 0 ? void 0 : song.artists[0].name}`, `${song === null || song === void 0 ? void 0 : song.id}`],
                ],
            },
        };
        yield googleSheetsInstance.spreadsheets.values.append(appendRequest);
    });
}
exports.addSongData = addSongData;
function filterData(data, header, value) {
    const foundGuest = data.find((obj) => obj[header].toLowerCase() === value.toLowerCase());
    if (!foundGuest)
        return null;
    const names = Object.entries(foundGuest).reduce((acc, [p, v]) => {
        if (p.includes('name') && v !== '')
            acc.push(v);
        return acc;
    }, []);
    return Object.assign(Object.assign({}, foundGuest), { names });
}
exports.filterData = filterData;
