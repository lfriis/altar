import { Router } from 'express';
import config from '../config';
import devRouter from './dev/dev.router';
import authRouter from './auth/auth.router';
import tagsRouter from './tags/tags.router';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/tags', tagsRouter);
/**
 * ? Deploying dev endpoint
 */
if (config.environment === 'DEVELOPMENT') routes.use('/dev', devRouter);

export default routes;
