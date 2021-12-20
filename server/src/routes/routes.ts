import { Router } from 'express';
const routes = Router();

/**
 * * User authentication endpoints
 */
import authStatus from './auth/auth.status';
routes.use('/auth', authStatus);

/**
 * * User CRUD endpoints
 */
import createUser from './user/create.user';
routes.use('/user', createUser);

export = routes;
