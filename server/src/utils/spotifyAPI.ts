/* eslint-disable camelcase */
import axios from 'axios';
import spotifyConfig from '../config/spotifyAPI';

export async function authenticate() {
	const encodedCrendentials = Buffer.from(
		`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`,
		'utf-8'
	).toString('base64');

	const result = await axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'post',
		data: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${encodedCrendentials}`,
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	const { access_token } = result.data;
	return access_token;
}

// export async function getTrackMetadata(spotifyToken: string, trackId: string) {
// 	const track = await axios({
// 		url: `https://api.spotify.com/v1/tracks/${trackId}`,
// 		method: 'get',
// 		headers: {
// 			Authorization: `Bearer ${spotifyToken}`,
// 		},
// 	});

// 	return track.data;
// }

export async function search(spotifyToken: string, searchKey: string) {
	const searchResult = await axios({
		url: 'https://api.spotify.com/v1/search',
		method: 'get',
		params: {
			q: searchKey,
			type: 'track',
		},
		headers: {
			Authorization: `Bearer ${spotifyToken}`,
		},
	});

	return searchResult.data;
}
