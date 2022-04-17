/* eslint-disable camelcase */
import { google, sheets_v4 } from 'googleapis';
import path from 'path';
import { Guest } from '../interfaces';

interface GetGoogleSheetsData {
	auth: any;
	googleSheetsInstance: sheets_v4.Sheets;
	spreadsheetId: string;
	sheetName: string;
	range?: string;
}

interface AddGoogleSheetsData extends GetGoogleSheetsData {
	values: Guest;
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
	values,
}: AddGoogleSheetsData) {
	const appendRequest = {
		auth,
		spreadsheetId,
		range: `${sheetName}`,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [
				[
					`${values.name}`,
					`${values.foodOption.main}`,
					`${values.foodOption.vegan}`,
					`${values.foodOption.glutenFree}`,
					`${values.foodOption.other}`,
					`${values.confirmed}`,
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
	values,
}: AddGoogleSheetsData) {
	const updateRequest = {
		auth,
		spreadsheetId,
		range: `${sheetName}!${range}`,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [
				[
					`${values.name}`,
					`${values.foodOption.main}`,
					`${values.foodOption.vegan}`,
					`${values.foodOption.glutenFree}`,
					`${values.foodOption.other}`,
					`${values.confirmed}`,
				],
			],
		},
	};

	await googleSheetsInstance.spreadsheets.values.update(updateRequest);
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
