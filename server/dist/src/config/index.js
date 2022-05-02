"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyConfig = exports.googleConfig = exports.serverConfig = void 0;
var server_config_1 = require("./server.config");
Object.defineProperty(exports, "serverConfig", { enumerable: true, get: function () { return __importDefault(server_config_1).default; } });
var google_config_1 = require("./google.config");
Object.defineProperty(exports, "googleConfig", { enumerable: true, get: function () { return __importDefault(google_config_1).default; } });
var spotify_config_1 = require("./spotify.config");
Object.defineProperty(exports, "spotifyConfig", { enumerable: true, get: function () { return __importDefault(spotify_config_1).default; } });
