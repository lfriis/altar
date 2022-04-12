import jwt from 'jsonwebtoken';

/**
 * * Overriding default JWT payload to include custom types
 */
declare module 'jsonwebtoken' {
	export interface AuthPayload extends jwt.JwtPayload {
		guestAddress: string;
	}
}
