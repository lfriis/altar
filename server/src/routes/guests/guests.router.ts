/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import {
	generateGoogleSpreadsheetInstance,
	getRow,
} from '../../utils/googleAPIs';

export const guestsRouter = express.Router();
export default guestsRouter;

const sheetId = '18xgeOlOhx4LFGWrWMN49HWuAZ4dIZklaB_yOceXmTIo';

/**
 * ? Controller Definitions
 */
guestsRouter.get('/:address', async (req: Request, res: Response) => {
	const { address } = req.params;
	try {
		const sheet = await generateGoogleSpreadsheetInstance(sheetId);
		const guestInfo = await getRow({
			sheet,
			header: 'address',
			value: address,
		});

		return res
			.status(200)
			.json({ message: 'Retrieved Guest Information', guestInfo });
	} catch (e) {
		return res.status(401).json({ e });
	}
});
