import * as dotenv from 'dotenv';
import { version } from '../../../package.json';

dotenv.config();

declare const process: {
	env: {
		readonly ENVIRONMENT: 'DEVELOPMENT' | 'PRODUCTION';
		readonly NAMESPACE: 'SERVER';
		readonly SERVER_HOSTNAME: string;
		readonly SERVER_PORT: number;
		readonly FRONT_END_URL: string;
		readonly JWT_TOKEN: string;
		readonly AUTOAUTH_JWT_TOKEN: string;
		readonly APP_PASSPHRASE: string;
	};
};

const server = {
	environment: process.env.ENVIRONMENT,
	namespace: 'SERVER',
	hostname: process.env.SERVER_HOSTNAME,
	port: process.env.SERVER_PORT,
	front_end_url: process.env.FRONT_END_URL,
	jwt_token: process.env.JWT_TOKEN,
	autoauth_jwt_token: process.env.AUTOAUTH_JWT_TOKEN,
	app_passphrase: process.env.APP_PASSPHRASE,
	version,
};

export default server;
