/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import generateGoogleSpreadsheetInstance from '../../utils/googleAPIs';

export const guestsRouter = express.Router();
export default guestsRouter;

/**
 * ? Controller Definitions
 */
guestsRouter.get('/:guestKey', async (req: Request, res: Response) => {
	try {
		console.log({ req });

		await generateGoogleSpreadsheetInstance();

		return res.status(200).json('Get guests endpoint called!');
	} catch (e) {
		return res.status(401).json({ e });
	}
});
