/* eslint-disable camelcase */
import { google, sheets_v4 } from 'googleapis';
import path from 'path';
import { GuestFoodSelection } from '../routes/guests/guests.interface';

interface GetGoogleSheetsData {
	auth: any;
	googleSheetsInstance: sheets_v4.Sheets;
	spreadsheetId: string;
	sheetName: string;
	range: string;
}

interface AddGoogleSheetsData extends GetGoogleSheetsData {
	values: GuestFoodSelection[];
}

function formatData(data: any) {
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
		keyFile: path.join(__dirname, '../config/googleAPI/googleConfig.json'),
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

	return formatData(data.values);
}

export async function addData({
	auth,
	googleSheetsInstance,
	spreadsheetId,
	sheetName,
	range,
	values,
}: AddGoogleSheetsData) {
	return googleSheetsInstance.spreadsheets.values.append({
		auth,
		spreadsheetId,
		range: `${sheetName}!${range}`,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: values.map((guest: GuestFoodSelection) => [
				guest.guestName,
				guest.foodSelection,
			]),
		},
	});
}

export async function updateData({
	auth,
	googleSheetsInstance,
	spreadsheetId,
	sheetName,
	range,
	values,
}: AddGoogleSheetsData) {
	return googleSheetsInstance.spreadsheets.values.append({
		auth,
		spreadsheetId,
		range: `${sheetName}!${range}`,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: values.map((guest: GuestFoodSelection) => [
				guest.guestName,
				guest.foodSelection,
			]),
		},
	});
}

export function filterData(data: any, header: string, value: string) {
	const foundGuest = data.find((obj: any) => obj[header] === value);
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
