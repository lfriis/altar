import { Router } from 'express';
const routes = Router();

import createUser from './user/create.user';
routes.use('/user', createUser);

export = routes;
