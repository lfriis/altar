import jwt from 'jsonwebtoken';
import config from '../config';

export default function generateJWTToken(payload: any) {
	const token = jwt.sign(payload, config.jwt_token, {
		expiresIn: '8h',
	});
	return token;
}
