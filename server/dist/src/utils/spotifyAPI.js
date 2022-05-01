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
exports.addToPlaylist = exports.search = exports.authenticate = void 0;
/* eslint-disable camelcase */
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        const encodedCrendentials = Buffer.from(`${config_1.spotifyConfig.clientId}:${config_1.spotifyConfig.clientSecret}`, 'utf-8').toString('base64');
        const result = yield (0, axios_1.default)({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            data: 'grant_type=client_credentials&scope=playlist-modify-public+playlist-modify-private',
            headers: {
                Authorization: `Basic ${encodedCrendentials}`,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const { access_token } = result.data;
        return access_token;
    });
}
exports.authenticate = authenticate;
function search(spotifyToken, searchKey, offset) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchResult = yield (0, axios_1.default)({
            url: 'https://api.spotify.com/v1/search',
            method: 'get',
            params: {
                q: searchKey,
                type: 'track',
                offset,
            },
            headers: {
                Authorization: `Bearer ${spotifyToken}`,
            },
        });
        return searchResult.data;
    });
}
exports.search = search;
function addToPlaylist(spotifyToken, trackId) {
    return __awaiter(this, void 0, void 0, function* () {
        const playlistId = '2kyMSuKcQFeegTu40QCAIW';
        const addTrack = yield (0, axios_1.default)({
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            method: 'post',
            data: {
                uris: [`spotify:track:${trackId}`],
            },
            headers: {
                Authorization: `Bearer ${spotifyToken}`,
            },
        });
        return addTrack.data;
    });
}
exports.addToPlaylist = addToPlaylist;
