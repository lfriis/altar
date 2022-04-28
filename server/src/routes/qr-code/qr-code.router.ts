/**
 * ? Required External Modules and Interfaces
 */
import express, { NextFunction, Request, Response } from 'express';
import { generateJWTToken, GoogleSheetsService } from '../../utils';
import { googleConfig } from '../../config';
import { GuestInfo } from '../guests/guests.interface';

export const qrCodeRouter = express.Router();
export default qrCodeRouter;

/**
 * ? Controller Definitions
 */
qrCodeRouter.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const authClientObject = await GoogleSheetsService.authenticate();
			const googleSheetsInstance =
				await GoogleSheetsService.generateInstance(authClientObject);

			// Fetch Existing Sheets Data
			const sheetsData: GuestInfo[] = await GoogleSheetsService.getData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest List',
				range: 'A:N',
			});

			const updatedGuestInfo = sheetsData.map((guest) => {
				console.log(guest.address);

				return {
					...guest,
					encrypted_address: `http://10.0.0.187:3000/?query=${generateJWTToken(
						{ address: guest.address }
					)}`,
				};
			});

			return res.status(200).json({ updatedGuestInfo });
		} catch (e) {
			console.log(e);
			return next(e);
		}
	}
);
