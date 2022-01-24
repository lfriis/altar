import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
// import { generateUberflipToken } from '../routes/auth/auth.service';

export default async function authenticateJWTToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { token: JWTToken } = req.cookies;

	if (!JWTToken) {
		console.log('Middleware: NOK Token');
		return res.status(401).json({
			message:
				'For your security the session has expired. Please re-enter your authentication information.',
			authenticated: false,
		});
	}

	try {
		const decodedToken = <jwt.IAutoAuthToken>(
			jwt.verify(JWTToken, config.jwt_token)
		);

		// Will throw error if APIKey and APISecret are old
		// const uberflipToken = await generateUberflipToken(
		// 	decodedToken.APIKey,
		// 	decodedToken.APISecret,
		// );

		req.date = new Date().toISOString();
		req.accountId = decodedToken.accountId;
		req.APIKey = decodedToken.APIKey;
		req.APISecret = decodedToken.APISecret;
		req.uberflipToken = decodedToken.uberflipToken;
		// req.uberflipToken = uberflipToken;
		next();
	} catch (e) {
		console.log(`Error: ${e}`);
		res.clearCookie('token');
		return res.status(401).json({
			message:
				'For your security the session has expired. Please re-enter your authentication information.',
			authenticated: false,
		});
	}

	return null;
}
