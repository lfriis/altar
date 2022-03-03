/* eslint-disable camelcase */
import { google, sheets_v4 } from 'googleapis';

import path from 'path';

interface GoogleSheetsData {
	auth: any;
	googleSheetsInstance: sheets_v4.Sheets;
	spreadsheetId: string;
	sheetName: string;
	range: string;
}

function formatData(data: any) {
	const headers: string[] = data.shift();

	return headers.map((prop: string, i: number) => {
		let tempObj = {};

		data[i].forEach((value: string, j: number) => {
			tempObj = {
				...tempObj,
				[headers[j]]: value,
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
}: GoogleSheetsData) {
	const { data } = await googleSheetsInstance.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: `${sheetName}!${range}`,
	});

	return formatData(data.values);
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
