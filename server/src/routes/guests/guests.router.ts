/**
 * ? Required External Modules and Interfaces
 */
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { googleConfig, serverConfig } from '../../config';
import { GoogleSheetsService } from '../../utils';

export const guestsRouter = express.Router();
export default guestsRouter;

/**
 * ? Controller Definitions
 */
guestsRouter.post(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		const { query, address } = req.body;
		let searchAddressKey: string;

		console.log({ query, address });

		if (query) {
			const decodedToken = <jwt.AuthPayload>(
				jwt.verify(query, serverConfig.jwt_token)
			);
			searchAddressKey = decodedToken.address;
		} else if (address) {
			searchAddressKey = address;
		} else {
			return res.status(400).send({
				message: 'Please provide a query or address.',
			});
		}

		try {
			const authClientObject = await GoogleSheetsService.authenticate();
			const googleSheetsInstance =
				await GoogleSheetsService.generateInstance(authClientObject);

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
				searchAddressKey
			);

			return res.status(200).json({
				message: 'Retrieved Guest Information',
				guestInfo,
			});
		} catch (e) {
			return next(e);
		}
	}
);

guestsRouter.post(
	'/option',
	async (req: Request, res: Response, next: NextFunction) => {
		const confirmedGuests = req.body;

		try {
			const authClientObject = await GoogleSheetsService.authenticate();
			const googleSheetsInstance =
				await GoogleSheetsService.generateInstance(authClientObject);

			await GoogleSheetsService.addData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest Food Options',
				range: 'A:B',
				values: confirmedGuests,
			});

			return res
				.status(200)
				.json({ message: 'Retrieved Guest Information' });
		} catch (e) {
			return next(e);
		}
	}
);
