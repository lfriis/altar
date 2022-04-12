import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { serverConfig } from '../config';

export default async function authenticateJWTToken(
	req: Request,
	res: Response,
	next: NextFunction
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
		const decodedToken = <jwt.AuthPayload>(
			jwt.verify(JWTToken, serverConfig.jwt_token)
		);

		console.log(decodedToken);
		// req.guestAddress = decodedToken.accountId;
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
