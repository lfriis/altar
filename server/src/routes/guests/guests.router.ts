/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import {
	generateGoogleSpreadsheetInstance,
	getRow,
	addDataToGoogleSpreadsheet,
} from '../../utils/googleAPIs';
import googleConfig from '../../config/googleAPI';

export const guestsRouter = express.Router();
export default guestsRouter;

/**
 * ? Controller Definitions
 */
guestsRouter.get('/:address', async (req: Request, res: Response) => {
	const { address } = req.params;
	try {
		const sheet = await generateGoogleSpreadsheetInstance(
			googleConfig.sheetId,
			'Guest List'
		);
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

guestsRouter.post('/option', async (req: Request, res: Response) => {
	const confirmedGuests = req.body;

	try {
		const sheet = await generateGoogleSpreadsheetInstance(
			googleConfig.sheetId,
			'Guest Food Options'
		);

		await addDataToGoogleSpreadsheet({
			sheet,
			rowData: confirmedGuests,
		});

		return res.status(200).json({ message: 'Retrieved Guest Information' });
	} catch (e) {
		return res.status(401).json({ e });
	}
});
