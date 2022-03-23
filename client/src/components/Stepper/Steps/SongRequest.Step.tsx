/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SongRequestStep() {
	const [spotifySearchTerm, setSpotifySearchTerm] = useState('');

	const searchSpotify = () => {
		axios
			.post('/api/spotify', {
				spotifySearchTerm,
			})
			.then((res) => {
				console.log(res.data);
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
		</>
	);
}
