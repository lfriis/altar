/* eslint-disable camelcase */
import { google, sheets_v4 } from 'googleapis';
import path from 'path';
import { Guests, SpotifySong } from '../routes/guests/guests.interface';

interface GetGoogleSheetsData {
	auth: any;
	googleSheetsInstance: sheets_v4.Sheets;
	spreadsheetId: string;
	sheetName: string;
	range?: string;
}

interface AddGoogleSheetsData extends GetGoogleSheetsData {
	foodSelection?: Guests;
	song?: SpotifySong;
}

function convertToJSONArray(data: any) {
	const headers: string[] = data.shift();

	return data.map((row: string[]) => {
		let tempObj = {};

		row.forEach((value: string, j: number) => {
			tempObj = {
				...tempObj,
				[headers[j]]: value.trim(),
			};
		});

		return tempObj;
	});
}

export async function authenticate() {
	const auth = new google.auth.GoogleAuth({
		keyFile: path.join(__dirname, '../config/googleConfig.json'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	return auth.getClient();
}

export async function generateInstance(authClientObject: any) {
	return google.sheets({ version: 'v4', auth: authClientObject });
}

export async function getData({
	auth,
	googleSheetsInstance,
	spreadsheetId,
	sheetName,
	range,
}: GetGoogleSheetsData) {
	const { data } = await googleSheetsInstance.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: `${sheetName}!${range}`,
	});

	return convertToJSONArray(data.values);
}

export async function addFoodData({
	auth,
	googleSheetsInstance,
	spreadsheetId,
	sheetName,
	foodSelection,
}: AddGoogleSheetsData) {
	const appendRequest = {
		auth,
		spreadsheetId,
		range: `${sheetName}`,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [
				[
					`${foodSelection?.name}`,
					`${foodSelection?.foodOption.main}`,
					`${foodSelection?.foodOption.vegan}`,
					`${foodSelection?.foodOption.glutenFree}`,
					`${foodSelection?.foodOption.other}`,
					`${foodSelection?.confirmed}`,
				],
			],
		},
	};

	await googleSheetsInstance.spreadsheets.values.append(appendRequest);
}

export async function updateFoodData({
	auth,
	googleSheetsInstance,
	spreadsheetId,
	sheetName,
	range,
	foodSelection,
}: AddGoogleSheetsData) {
	const updateRequest = {
		auth,
		spreadsheetId,
		range: `${sheetName}!${range}`,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [
				[
					`${foodSelection?.name}`,
					`${foodSelection?.foodOption.main}`,
					`${foodSelection?.foodOption.vegan}`,
					`${foodSelection?.foodOption.glutenFree}`,
					`${foodSelection?.foodOption.other}`,
					`${foodSelection?.confirmed}`,
				],
			],
		},
	};

	await googleSheetsInstance.spreadsheets.values.update(updateRequest);
}

export async function addSongData({
	auth,
	googleSheetsInstance,
	spreadsheetId,
	sheetName,
	song,
}: AddGoogleSheetsData) {
	const appendRequest = {
		auth,
		spreadsheetId,
		range: `${sheetName}`,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [
				[`${song?.name}`, `${song?.artists[0].name}`, `${song?.id}`],
			],
		},
	};

	await googleSheetsInstance.spreadsheets.values.append(appendRequest);
}

export function filterData(data: any, header: string, value: string) {
	const foundGuest = data.find(
		(obj: any) => obj[header].toLowerCase() === value.toLowerCase()
	);
	if (!foundGuest) return null;

	const names = Object.entries(foundGuest).reduce((acc: any, [p, v]) => {
		if (p.includes('name') && v !== '') acc.push(v);
		return acc;
	}, []);

	return {
		...foundGuest,
		names,
	};
}
