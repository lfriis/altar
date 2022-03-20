/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SongRequestStep() {
	return (
		<TextField
			size="small"
			variant="outlined"
			placeholder="Search Spotify..."
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon fontSize="small" />
					</InputAdornment>
				),
			}}
		/>
	);
}
