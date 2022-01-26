import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
	GoogleSpreadsheetRow,
} from 'google-spreadsheet';
import googleConfig from '../config/googleAPI';

interface IRow {
	sheet: GoogleSpreadsheetWorksheet;
	header: string;
	value: string;
}

/**
 * Connects to Google Spreadsheet
 * @param sheetId Google Spreadsheet ID
 * @returns First worksheet in Google Spreadsheet
 */
export async function generateGoogleSpreadsheetInstance(sheetId: string) {
	const doc = new GoogleSpreadsheet(sheetId);
	await doc.useServiceAccountAuth({
		client_email: googleConfig.clientEmail,
		private_key: googleConfig.privateKey,
	});
	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[0];

	return sheet;
}

/**
 * Parsing cells into numbers with regex
 * @param str Data cell to cast
 * @returns Casted string
 */
function parseNum(str: string) {
	if (str.match(/^-?\d+$/)) {
		return parseInt(str, 10);
	}

	if (str.match(/^\d+\.\d+$/)) {
		return parseFloat(str);
	}
	return str;
}

/**
 * Format Google Spreadsheet row into a readable/parseable format
 * @param row Google Spreadsheet row
 * @returns Formatted row
 */
async function formatRow(row: GoogleSpreadsheetRow | undefined) {
	let names: string[] = [];
	const modifiedRow = { ...row };

	const metaKeys = Object.keys(modifiedRow).filter((key) => key[0] === '_');

	for (const metaKey of metaKeys) {
		delete modifiedRow[metaKey];
	}

	for (const header in modifiedRow) {
		if (Object.prototype.hasOwnProperty.call(modifiedRow, header)) {
			if (header.includes('name') && modifiedRow[header] !== '') {
				names = [...names, modifiedRow[header]];
			}
			modifiedRow[header] = parseNum(modifiedRow[header]);
		}
	}

	return {
		...modifiedRow,
		names,
	};
}

/**
 * Retrieves Google Spreadsheet row
 * @param param0 Selectors to retrieve row
 * @returns Formatted row
 */
export async function getRow({ sheet, header, value }: IRow) {
	await sheet.loadHeaderRow();
	const rows = await sheet.getRows();
	const result = rows.find((row) => row[header] === value);

	return formatRow(result);
}
