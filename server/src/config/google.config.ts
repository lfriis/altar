/* eslint-disable camelcase */
import * as dotenv from 'dotenv';
import { client_email, private_key } from './googleConfig.json';

dotenv.config();

declare const process: {
	env: {
		readonly GOOGLE_SHEET_ID: string;
	};
};

const googleConfig = {
	clientEmail: client_email,
	privateKey: private_key,
	sheetId: process.env.GOOGLE_SHEET_ID,
};

export default googleConfig;
