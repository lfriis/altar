declare module 'express-serve-static-core' {
	interface Request {
		date?: string;
		accountId?: number;
		APIKey?: string;
		APISecret?: string;
		uberflipToken?: string;
	}
}

export {};
