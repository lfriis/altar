import express, {
	Application,
	Request,
	Response,
	NextFunction,
	urlencoded,
	json,
} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import routes from './routes/routes';
import { server as config } from './config/serverConfig';
import { info, error } from './middleware/logging';

const server: Application = express();

/**
 * ? Middleware
 */
server.use(json());
server.use(cookieParser());
server.use(urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: config.front_end_url }));
server.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});
server.use(express.json({ limit: '50mb' }));
server.use(express.static(path.resolve('../client/build')));
server.use(routes);

/**
 * ? Logging requests
 */
server.use((req: Request, res: Response, next: NextFunction): void => {
	info({
		namespace: config.namespace,
		message: `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
	});

	res.on('finish', (): void => {
		info({
			namespace: config.namespace,
			message: `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
		});
	});

	next();
});

/**
 * ? Server deployment
 */
server
	.listen(config.port, (): void => {
		info({
			namespace: config.namespace,
			message: `${config.environment} server listening @ http://${config.hostname}:${config.port}`,
		});
	})
	.on('error', (err): void => {
		error({
			namespace: config.namespace,
			message: `Error deploying server`,
			object: err,
		});
	});

// /**
//  * ? Handling refreshes
//  */
// server.get('/*', (res: Response): void => {
// 	res.sendFile(
// 		path.join(__dirname, '../client/build/index.html'),
// 		async function (e) {
// 			if (e) {
// 				res.status(500).send(e);
// 			}
// 		}
// 	);
// });

/**
 * ? Error handling to help with unhandled rejection
 */
process
	.on('SIGINT', (): void => {
		process.exit();
	})
	.on('unhandledRejection', (reason: string, p: object): void => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', (err: Error): void => {
		console.error(err, 'Uncaught Exception thrown');
		process.exit(1);
	});
