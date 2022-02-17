import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
	GoogleSpreadsheetRow,
} from 'google-spreadsheet';
import googleConfig from '../config/googleAPI';

interface IGetRow {
	sheet: GoogleSpreadsheetWorksheet;
	header: string;
	value: string;
}

interface IAddRow {
	sheet: GoogleSpreadsheetWorksheet;
	rowData: any;
}

/**
 * Creates a Google Spreadsheet Instance
 * @param sheetId Google Spreadsheet ID
 * @returns
 */
export async function generateGoogleSpreadsheetInstance(
	sheetId: string,
	title: string
) {
	const doc = new GoogleSpreadsheet(sheetId);
	await doc.useServiceAccountAuth({
		client_email: googleConfig.clientEmail,
		private_key: googleConfig.privateKey,
	});
	await doc.loadInfo();
	let sheet = doc.sheetsByTitle[title];

	if (!sheet) {
		sheet = await doc.addSheet({ title: 'Guest Food Options' });
		await sheet.setHeaderRow(['guestName', 'foodSelection']);
	}

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

	if (names.length === 0) return { ...modifiedRow };
	return { ...modifiedRow, names };
}

/**
 * Retrieves Google Spreadsheet row
 * @param param0 Selectors to retrieve row
 * @returns Formatted row
 */
export async function getRow({ sheet, header, value }: IGetRow) {
	await sheet.loadHeaderRow();
	const rows = await sheet.getRows();
	const result = rows.find((row) => row[header] === value);

	return formatRow(result);
}

export async function addDataToGoogleSpreadsheet({ sheet, rowData }: IAddRow) {
	// checking if row already exists
	rowData.forEach(async (guest: any) => {
		const foundGuest = await getRow({
			sheet,
			header: 'guestName',
			value: guest.guestName,
		});

		console.log(guest, foundGuest);

		// if guest does not exist
		if (Object.keys(foundGuest).length === 0) await sheet.addRows([guest]);
		else {
			// foundGuest = guest;
			// await foundGuest.save();
			console.log('Update guest');
		}
	});
}
