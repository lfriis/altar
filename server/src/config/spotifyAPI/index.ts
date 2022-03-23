/* eslint-disable camelcase */
import * as dotenv from 'dotenv';

dotenv.config();

declare const process: {
	env: {
		readonly SPOTIFY_CLIENT_ID: string;
		readonly SPOTIFY_CLIENT_SECRET: string;
	};
};

const spotifyConfig = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

export default spotifyConfig;
