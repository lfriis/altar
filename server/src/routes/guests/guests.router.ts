/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/**
 * ? Required External Modules and Interfaces
 */
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { googleConfig, serverConfig } from '../../config';
import { Guests, GuestFoodRow, SpotifySong } from './guests.interface';
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

			// Fetch Existing Sheets Data
			const sheetsData = await GoogleSheetsService.getData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest List',
				range: 'A:N',
			});

			// Filter Sheet Data by Address
			const guestInfo = GoogleSheetsService.filterData(
				sheetsData,
				'address',
				searchAddressKey
			);

			if (!guestInfo) {
				return res.status(404).send({
					message:
						'There is no record with that address, please try again. If this issue persists, reach out to Jillian or Larsen.',
				});
			}

			const guestFoodSelectionData = await GoogleSheetsService.getData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest Food Selections',
				range: 'A:F',
			});

			const guestsFoodSelectionsExist = guestInfo.names.some(
				(guestName: string) => {
					const foundGuestSelections = guestFoodSelectionData.filter(
						(g: GuestFoodRow) => g.name === guestName
					);

					return foundGuestSelections.length > 0;
				}
			);

			return res.status(200).json({
				message: 'Retrieved Guest Information',
				guestInfo,
				guestsFoodSelectionsExist,
			});
		} catch (e) {
			return next(e);
		}
	}
);

guestsRouter.post(
	'/rsvp',
	async (req: Request, res: Response, next: NextFunction) => {
		const { guests, guestInfo } = req.body;

		try {
			const authClientObject = await GoogleSheetsService.authenticate();
			const googleSheetsInstance =
				await GoogleSheetsService.generateInstance(authClientObject);

			const guestFoodSelectionData = await GoogleSheetsService.getData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest Food Selections',
				range: 'A:F',
			});

			for (let i = 0; i < guests.length; i++) {
				const guest: Guests = guests[i];

				if (guest.name === 'plus 1') return;
				const guestFoodSelectionIndex =
					guestFoodSelectionData.findIndex(
						(g: any) => g.name === guest.name
					);

				if (guestFoodSelectionIndex === -1) {
					await GoogleSheetsService.addFoodData({
						auth: authClientObject,
						googleSheetsInstance,
						spreadsheetId: googleConfig.sheetId,
						sheetName: 'Guest Food Selections',
						foodSelection: guest,
					});
				} else {
					await GoogleSheetsService.updateFoodData({
						auth: authClientObject,
						googleSheetsInstance,
						spreadsheetId: googleConfig.sheetId,
						sheetName: 'Guest Food Selections',
						range: `A${guestFoodSelectionIndex + 2}`,
						foodSelection: guest,
					});
				}
			}

			if (guestInfo.songRequests.length > 0) {
				for (let i = 0; i < guestInfo.songRequests.length; i++) {
					const song: SpotifySong = guestInfo.songRequests[i];

					await GoogleSheetsService.addSongData({
						auth: authClientObject,
						googleSheetsInstance,
						spreadsheetId: googleConfig.sheetId,
						sheetName: 'Song Requests',
						song,
					});
				}
			}

			return res
				.status(200)
				.json({ message: 'RSVP successfully saved!' });
		} catch (e: any) {
			return next(e);
		}
	}
);

guestsRouter.get(
	'/rsvp-results',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const authClientObject = await GoogleSheetsService.authenticate();
			const googleSheetsInstance =
				await GoogleSheetsService.generateInstance(authClientObject);

			const guestList = await GoogleSheetsService.getData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest List',
				range: 'A:N',
			});

			const guestFoodSelectionData = await GoogleSheetsService.getData({
				auth: authClientObject,
				googleSheetsInstance,
				spreadsheetId: googleConfig.sheetId,
				sheetName: 'Guest Food Selections',
				range: 'A:F',
			});

			const tofu = guestFoodSelectionData.filter(
				(g: any) => g.main === 'Tofu Scallopini'
			);

			const pork = guestFoodSelectionData.filter(
				(g: any) => g.main === 'Pork Tenderloin'
			);

			const confirmed = guestFoodSelectionData.filter(
				(g: any) => g.confirmed === 'TRUE'
			);

			const declined = guestFoodSelectionData.filter(
				(g: any) => g.confirmed === 'FALSE'
			);

			const flattenedGuestList = guestList.reduce(
				(acc: any, row: any) => {
					Object.entries(row).forEach(([key, value]) => {
						if (
							key.includes('name') &&
							value !== '' &&
							value !== 'plus 1'
						) {
							acc.push({
								name: value,
							});
						}
					});
					return acc;
				},
				[]
			);

			const noResponse = flattenedGuestList.reduce(
				(acc: any, guest: any) => {
					const foundGuest = guestFoodSelectionData.filter(
						(g: any) => g.name === guest.name
					);

					if (foundGuest.length === 0) {
						acc.push(guest.name);
					}

					return acc;
				},
				[]
			);

			return res.status(200).json({
				tofu: tofu.length,
				pork: pork.length,
				confirmed: confirmed.length,
				declined: declined.length,
				noResponse,
			});
		} catch (e: any) {
			return next(e);
		}
	}
);
