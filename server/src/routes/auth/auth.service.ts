import axios from 'axios';
import { paginatedGet } from '../../utils/getFunctions';
import { ICurrentUser } from './auth.interface';

export async function generateUberflipToken(
	KEY: string,
	SECRET: string,
): Promise<string> {
	const result = await axios({
		url: 'https://v2.api.uberflip.com/authorize',
		method: 'post',
		data: {
			grant_type: 'client_credentials',
			client_id: KEY,
			client_secret: SECRET,
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return result.data.access_token;
}

export async function getAccountId(token: string): Promise<number | null> {
	const hubResult = await axios({
		url: `https://v2.api.uberflip.com/hubs`,
		method: 'get',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const { data: hub } = hubResult.data;
	const hubId = hub[0].id;

	if (!hubId) return null;
	const accountResult = await axios({
		url: `https://v2.api.uberflip.com/hubs/${hubId}/custom-code-blocks`,
		method: 'get',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	// If the current account has no code blocks
	if (accountResult.data.data.length === 0) {
		console.log('No code blocks found in account.');

		const codeBlockResult = await axios({
			url: `https://v2.api.uberflip.com/hubs/${hubId}/custom-code-blocks`,
			method: 'post',
			data: {
				name: 'Uberflip Application Code Block',
				content: '',
				enabled: false,
				description:
					'This code block is created for Uberflip Application authentication. Do not delete.',
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log('Created code block.');
		const { data: account } = codeBlockResult;
		const accountId = account.account_id;
		return accountId;
	}
	const { data: account } = accountResult.data;
	const accountId = account[0].account_id;
	return accountId;
}

export async function getCurrentUser(token: string): Promise<ICurrentUser> {
	const res = await axios({
		url: `https://v2.api.uberflip.com/users/current`,
		method: 'get',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function getUserPermissions(token: string, userId: number) {
	const data = await paginatedGet(
		token,
		`https://v2.api.uberflip.com/users/${userId}/effective-global-permissions`,
	);
	return data;
}

export async function readHubs(uberflipToken: string) {
	const data = await paginatedGet(
		uberflipToken,
		`https://v2.api.uberflip.com/hubs`,
	);
	return data;
}

// export async function authenticateLegacyCreds(
// 	key: string,
// 	signature: string,
// 	hubId: number,
// ) {
// 	// Fetching HubUser metadata
// 	async function fetchUser() {
// 		let result;
// 		try {
// 			result = await axios({
// 				url: `https://api.uberflip.com/`,
// 				method: 'get',
// 				params: {
// 					Version: '0.1',
// 					Method: 'AuthenticateHubUser',
// 					APIKey: key,
// 					Signature: signature,
// 					HubId: hubId,
// 					ResponseType: 'JSON',
// 				},
// 			});
// 		} catch (err) {
// 			return err;
// 		}
// 		return result;
// 	}

// 	// Extracting token for API calls
// 	async function fetchToken() {
// 		const tokenData = await fetchUser();
// 		const token = tokenData.data[0].Token;

// 		return token;
// 	}
// 	return fetchToken();
// }
