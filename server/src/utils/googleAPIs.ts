import { GoogleSpreadsheet } from 'google-spreadsheet';
import googleConfig from '../config/googleAPI';

const doc = new GoogleSpreadsheet(
	'18xgeOlOhx4LFGWrWMN49HWuAZ4dIZklaB_yOceXmTIo'
);

export default async function generateGoogleSpreadsheetInstance() {
	await doc.useServiceAccountAuth({
		client_email: googleConfig.clientEmail,
		private_key: googleConfig.privateKey,
	});

	await doc.loadInfo();
	console.log(doc.title);

	// 	await doc.updateProperties({ title: 'renamed doc' });

	// 	const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
	// 	console.log(sheet.title);
	// 	console.log(sheet.rowCount);

	// 	// adding / removing sheets
	// 	const newSheet = await doc.addSheet({ title: 'hot new sheet!' });

	// 	console.log(newSheet);
}
