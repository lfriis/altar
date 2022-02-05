import { Router } from 'express';
import config from '../config/server';
import devRouter from './dev/dev.router';
import guestsRouter from './guests/guests.router';

const routes = Router();

routes.use('/guests', guestsRouter);

/**
 * ? Deploying dev endpoint
 */
if (config.environment === 'DEVELOPMENT') routes.use('/dev', devRouter);

export default routes;
