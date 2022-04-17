/* eslint-disable camelcase */
import axios from 'axios';
import { spotifyConfig } from '../config';

export async function authenticate() {
	const encodedCrendentials = Buffer.from(
		`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`,
		'utf-8'
	).toString('base64');

	const result = await axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'post',
		data: 'grant_type=client_credentials&scope=playlist-modify-public+playlist-modify-private',
		headers: {
			Authorization: `Basic ${encodedCrendentials}`,
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	console.log(result);

	const { access_token } = result.data;
	return access_token;
}

export async function search(
	spotifyToken: string,
	searchKey: string,
	offset: number
) {
	const searchResult = await axios({
		url: 'https://api.spotify.com/v1/search',
		method: 'get',
		params: {
			q: searchKey,
			type: 'track',
			offset,
		},
		headers: {
			Authorization: `Bearer ${spotifyToken}`,
		},
	});

	return searchResult.data;
}

export async function addToPlaylist(spotifyToken: string, trackId: string) {
	const playlistId = '2kyMSuKcQFeegTu40QCAIW';

	const addTrack = await axios({
		url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		method: 'post',
		data: {
			uris: [`spotify:track:${trackId}`],
		},
		headers: {
			Authorization: `Bearer ${spotifyToken}`,
		},
	});

	return addTrack.data;
}
