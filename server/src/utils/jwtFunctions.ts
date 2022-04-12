import jwt from 'jsonwebtoken';
import { serverConfig } from '../config';

export default function generateJWTToken(payload: any) {
	const token = jwt.sign(payload, serverConfig.jwt_token, {
		expiresIn: '8h',
	});
	return token;
}
