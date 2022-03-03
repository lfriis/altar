import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import config from './config/server';
import logging from './middleware/logging.middleware';
import { logger } from './utils';

const server = express();

/**
 * ? Middleware
 */
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: config.front_end_url }));
server.use(helmet());
server.use(morgan('dev'));
server.use('/api', routes);
server.use(logging);

/**
 * ? Server deployment
 */
server
	.listen(config.port, (): void => {
		logger.info({
			namespace: config.namespace,
			message: `${config.environment} server listening @ http://${config.hostname}:${config.port}`,
		});
	})
	.on('error', (err: Error): void => {
		logger.error({
			namespace: config.namespace,
			message: 'Error deploying server',
			object: err,
		});
	});

/**
 * ? Error handling to help with unhandled rejection
 */
process
	.on('SIGINT', (): void => {
		process.exit();
	})
	.on('unhandledRejection', (reason: string, p: object): void => {
		console.log(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', (err: Error): void => {
		console.log(err, 'Uncaught Exception thrown');
		process.exit(1);
	});
