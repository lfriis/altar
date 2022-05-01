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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authenticateJWTToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token: JWTToken } = req.cookies;
        if (!JWTToken) {
            console.log('Middleware: NOK Token');
            return res.status(401).json({
                message: 'For your security the session has expired. Please re-enter your authentication information.',
                authenticated: false,
            });
        }
        try {
            const decodedToken = (jsonwebtoken_1.default.verify(JWTToken, config_1.serverConfig.jwt_token));
            console.log(decodedToken);
            // req.guestAddress = decodedToken.accountId;
            next();
        }
        catch (e) {
            console.log(`Error: ${e}`);
            res.clearCookie('token');
            return res.status(401).json({
                message: 'For your security the session has expired. Please re-enter your authentication information.',
                authenticated: false,
            });
        }
        return null;
    });
}
exports.default = authenticateJWTToken;
