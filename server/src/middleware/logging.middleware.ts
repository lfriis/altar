import { Request, Response, NextFunction } from 'express';
import { serverConfig } from '../config';
import { logger } from '../utils';

export default function logging(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	logger.info({
		namespace: serverConfig.namespace,
		message: `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
	});

	res.on('finish', (): void => {
		logger.info({
			namespace: serverConfig.namespace,
			message: `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
		});
	});

	next();
}
