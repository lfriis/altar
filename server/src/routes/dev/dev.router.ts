/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import getGitInfo from './dev.service';
import { IGitInfo } from './dev.interface';

/**
 * ? Router Definition
 */
export const devRouter = express.Router();
export default devRouter;

/**
 * ? Controller Definitions
 */
devRouter.get('/gitInfo', async (req: Request, res: Response) => {
	try {
		const gitInfo: IGitInfo = getGitInfo();

		return res
			.status(200)
			.json({ message: 'Routes are healthy!', status: 'UP', gitInfo });
	} catch (e) {
		console.log(`${e}`);
		return res
			.status(400)
			.json({ message: 'Routes are unstable!', status: 'WARNING' });
	}
});
