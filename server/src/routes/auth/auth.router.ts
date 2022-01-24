/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as AuthService from './auth.service';
import config from '../../config';
import { generateJWTToken } from '../../utils';
import authenticateJWTToken from '../../middleware/authenticate.middleware';
/**
 * ? Router Definition
 */
export const authRouter = express.Router();
export default authRouter;

/**
 * ? Controller Definitions
 */
authRouter.post('/login', async (req: Request, res: Response) => {
	const { autoAuthToken, authCreds } = req.body;

	let APIKey: string = '';
	let APISecret: string = '';
	if (authCreds) {
		APIKey = authCreds.APIKey;
		APISecret = authCreds.APISecret;
	}

	let uberflipToken: string;

	try {
		if (autoAuthToken) {
			// Get the API key/secret from the token
			console.log('Logging in using Auto Auth');
			const decoded = <jwt.IAutoAuthToken>(
				jwt.verify(autoAuthToken, config.autoauth_jwt_token)
			);
			APIKey = decoded.apiKey;
			APISecret = decoded.apiSecret;
			uberflipToken = decoded.uberflipToken;
		} else if (authCreds?.passphrase === config.app_passphrase) {
			uberflipToken = await AuthService.generateUberflipToken(
				APIKey,
				APISecret,
			);
		} else
			return res.status(401).json({
				message: 'Passphrase incorrect, please try again.',
				authenticated: false,
				source: 'passphrase',
			});

		const accountId = await AuthService.getAccountId(uberflipToken);
		const currentUser = await AuthService.getCurrentUser(uberflipToken);
		const userPermissions = await AuthService.getUserPermissions(
			uberflipToken,
			currentUser.id,
		);

		const jwtToken = generateJWTToken({
			accountId,
			APIKey,
			APISecret,
			uberflipToken,
		});

		console.log(
			'JWT Token created and stored in session. Authentication Successful.',
		);

		return res
			.cookie('token', jwtToken, { httpOnly: true })
			.status(200)
			.json({
				message: 'Authentication Successful.',
				authenticated: true,
				accountId,
				currentUser,
				userPermissions,
				version: config.version,
			})
			.send();
	} catch (e) {
		// Auto auth error is not displayed on the front-end
		const message = autoAuthToken
			? `AutoAuth Error: ${e}`
			: 'Account information incorrect, please check your credentials.';

		console.log(`${message}: ${e}`);
		return res.status(401).json({
			message,
			authenticated: false,
			source: 'credentials',
		});
	}
});

authRouter.delete('/logout', (req: Request, res: Response) => {
	res.clearCookie('token');

	return res.status(200).json({
		message: 'User has been successfully logged out.',
		authenticated: false,
	});
});

authRouter.get(
	'/status',
	authenticateJWTToken,
	(req: Request, res: Response) => {
		try {
			res.setHeader(
				'Cache-Control',
				'private, max-age=0, no-cache, no-store',
			);
			console.log('Status: OK Token');

			return res.status(200).json({
				message: 'User authenticated',
				authenticated: true,
			});
		} catch (e) {
			console.log('Status: NOK Token');
			console.log('err', e);
			// Incase of expired jwt or invalid token kill the token and clear the cookie
			res.clearCookie('token');
			return res.status(401).json({
				message:
					'Login duration has expired. For your security, please re-enter re-authenticate',
				authenticated: false,
			});
		}
	},
);
