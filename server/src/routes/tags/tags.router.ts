/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import * as TagsService from './tags.service';
import authenticateJWTToken from '../../middleware/authenticate.middleware';
/**
 * ? Router Definition
 */
export const tagsRouter = express.Router();
export default tagsRouter;

/**
 * ? Controller Definitions
 */
tagsRouter.get(
	'/',
	authenticateJWTToken,
	async (req: Request, res: Response) => {
		try {
			if (req.uberflipToken === undefined)
				throw new Error('token missing');

			const tags = await TagsService.default(req.uberflipToken);

			return res.status(200).json({ tags });
		} catch (e) {
			return res.status(401).json({ e });
		}
	},
);
