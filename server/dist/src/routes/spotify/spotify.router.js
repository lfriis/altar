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
exports.spotifyRouter = void 0;
/**
 * ? Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
exports.spotifyRouter = express_1.default.Router();
exports.default = exports.spotifyRouter;
/**
 * ? Controller Definitions
 */
exports.spotifyRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { spotifySearchTerm, spotifyOffset } = req.body;
    try {
        const spotifyToken = yield utils_1.SpotifyService.authenticate();
        const searchResults = yield utils_1.SpotifyService.search(spotifyToken, spotifySearchTerm, spotifyOffset);
        return res.status(200).json({
            message: 'Successful Spotify Authentication',
            searchResults,
        });
    }
    catch (e) {
        return next(e);
    }
}));
