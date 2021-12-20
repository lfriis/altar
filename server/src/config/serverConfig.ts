import { version } from '../../package.json';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/config.env` });

export const server = {
	namespace: 'SERVER',
	environment: process.env.ENVIRONMENT,
	hostname: process.env.SERVER_HOSTNAME,
	port: process.env.SERVER_PORT,
	front_end_url: process.env.FRONT_END_URL,
	jwt_token: process.env.JWT_TOKEN,
	version: version,
};
