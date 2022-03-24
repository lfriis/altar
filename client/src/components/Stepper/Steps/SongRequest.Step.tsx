/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import SpotifyCard from '../../Spotify.Card';

export default function SongRequestStep() {
	const [spotifySearchTerm, setSpotifySearchTerm] = useState('');
	const [spotifyResults, setSpotifyResults] = useState([])

	const searchSpotify = () => {
		axios
			.post('/api/spotify', {
				spotifySearchTerm,
			})
			.then((res) => {
				console.log(res.data.searchResults);
				setSpotifyResults(res.data.searchResults)
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			<TextField
				size="small"
				variant="outlined"
				placeholder="Search Spotify..."
				onChange={(e) => setSpotifySearchTerm(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search fontSize="small" />
						</InputAdornment>
					),
				}}
			/>
			<Button onClick={searchSpotify}>Search spotify test</Button>
			{spotifyResults.length > 0 && (

<SpotifyCard />
				// spotifyResults.items((item) => {
				// 	SpotifyCard
				// })
			)}
		</>
	);
}
