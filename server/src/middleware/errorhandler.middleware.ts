import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export default function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	let status = 500;
	let message =
		'Internal Server Error. If this persists, please contact Altar Support.';

	if (axios.isAxiosError(error)) {
		status = error.response!.status;
		message = error
			.response!.data.errors.map((_error: any) => _error.message)
			.join();
	}

	res.status(status).send({
		status,
		message,
	});

	next();
}
