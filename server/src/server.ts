import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { serverConfig } from './config';
import { loggingMiddlware, errorHandler } from './middleware';
import { logger } from './utils';

const server = express();

/**
 * ? Middleware
 */
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: serverConfig.front_end_url }));
server.use(helmet());
server.use(morgan('dev'));
server.use('/api', routes);
server.use(errorHandler);
server.use(loggingMiddlware);

/**
 * ? Server deployment
 */
server
	.listen(serverConfig.port, (): void => {
		logger.info({
			namespace: serverConfig.namespace,
			message: `${serverConfig.environment} server listening @ http://${serverConfig.hostname}:${serverConfig.port}`,
		});
	})
	.on('error', (err: Error): void => {
		logger.error({
			namespace: serverConfig.namespace,
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
