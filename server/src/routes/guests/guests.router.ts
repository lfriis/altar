/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import googleConfig from '../../config/googleAPI';
import { GoogleSheetsService } from '../../utils';

export const guestsRouter = express.Router();
export default guestsRouter;

/**
 * ? Controller Definitions
 */
guestsRouter.get('/:address', async (req: Request, res: Response) => {
	const { address } = req.params;

	console.log({ address });
	try {
		const authClientObject = await GoogleSheetsService.authenticate();
		const googleSheetsInstance = await GoogleSheetsService.generateInstance(
			authClientObject
		);

		const sheetsData = await GoogleSheetsService.getData({
			auth: authClientObject,
			googleSheetsInstance,
			spreadsheetId: googleConfig.sheetId,
			sheetName: 'Guest List',
			range: 'A:J',
		});

		const guestInfo = GoogleSheetsService.filterData(
			sheetsData,
			'address',
			address
		);

		return res
			.status(200)
			.json({ message: 'Retrieved Guest Information', guestInfo });
	} catch (e) {
		console.log(e);
		return res.status(401).json({ e });
	}
});

guestsRouter.post('/option', async (req: Request, res: Response) => {
	const confirmedGuests = req.body;

	try {
		const authClientObject = await GoogleSheetsService.authenticate();
		const googleSheetsInstance = await GoogleSheetsService.generateInstance(
			authClientObject
		);

		await GoogleSheetsService.addData({
			auth: authClientObject,
			googleSheetsInstance,
			spreadsheetId: googleConfig.sheetId,
			sheetName: 'Guest Food Options',
			range: 'A:B',
			values: confirmedGuests,
		});

		return res.status(200).json({ message: 'Retrieved Guest Information' });
	} catch (e) {
		console.log(e);

		return res.status(401).json({ e });
	}
});
