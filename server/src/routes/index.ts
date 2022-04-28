import { Router } from 'express';
import { serverConfig } from '../config';
import devRouter from './dev/dev.router';
import guestsRouter from './guests/guests.router';
import spotifyRouter from './spotify/spotify.router';
import qrCodeRouter from './qr-code/qr-code.router';

const routes = Router();

routes.use('/guests', guestsRouter);
routes.use('/spotify', spotifyRouter);

/**
 * ? Deploying dev endpoint
 */
if (serverConfig.environment === 'DEVELOPMENT') {
	routes.use('/dev', devRouter);
	routes.use('/qr-code', qrCodeRouter);
}

export default routes;
