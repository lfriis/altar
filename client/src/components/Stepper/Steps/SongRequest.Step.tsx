import React, { useState, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
	TextField,
	InputAdornment,
	CircularProgress,
	Button,
	// Accordion,
	// AccordionSummary,
	// Typography,
	// AccordionDetails,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import SpotifyCard from '../../Spotify.Card';
import { useGuestInfo, useSetUpdatedGuestInfo } from '../../../store';
import { parseURL } from '../../../utils';

export default function SongRequestStep() {
	const guestInfo = useGuestInfo();
	const updateGuestInfo = useSetUpdatedGuestInfo();
	const [loading, setLoading] = useState(false);
	const [nextOffset, setNextOffset] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	const [spotifyResults, setSpotifyResults] = useState<
		SpotifyApi.TrackObjectFull[]
	>([]);

	const searchSpotify = (
		spotifySearchTerm: string,
		spotifyOffset: number = 0
	) => {
		if (spotifySearchTerm.length === 1) return;

		setLoading(true);
		axios
			.post('/api/spotify', {
				spotifySearchTerm,
				spotifyOffset,
			})
			.then((res) => {
				setSpotifyResults(res.data.searchResults.tracks.items);

				setNextOffset(
					parseInt(
						parseURL(res.data.searchResults.tracks.next).offset,
						10
					)
				);
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const debouncedFilterFunction = useCallback(
		_.debounce(searchSpotify, 250),
		[]
	);

	const handleSetSongRequest = (trackId: string) => {
		if (guestInfo) {
			if (!guestInfo?.songRequests.includes(trackId)) {
				const editedGuestInfo = guestInfo.clone();
				editedGuestInfo.songRequests = [
					...editedGuestInfo.songRequests,
					trackId,
				];
				updateGuestInfo(editedGuestInfo);
			} else {
				const editedGuestInfo = guestInfo.clone();
				editedGuestInfo.songRequests =
					editedGuestInfo.songRequests.filter(
						(track) => track !== trackId
					);
				updateGuestInfo(editedGuestInfo);
			}
		}
	};

	return (
		<>
			<TextField
				size="small"
				variant="outlined"
				placeholder="Search Spotify..."
				disabled={loading}
				onChange={(e) => {
					if (e.target.value === '') {
						setSpotifyResults([]);
						setNextOffset(0);
					} else {
						setSearchTerm(e.target.value);
						debouncedFilterFunction(e.target.value);
					}
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
				}}
				helperText={
					spotifyResults.length > 0 &&
					`${spotifyResults.length} results`
				}
			/>
			{loading && <CircularProgress />}
			{/* <Button
				disabled={loading}
				onClick={() => searchSpotify(searchTerm, previousOffset)}
			>
				See Previous Page
			</Button> */}
			{nextOffset !== 0 && (
				<Button
					disabled={loading}
					onClick={() => searchSpotify(searchTerm, nextOffset)}
				>
					See Next Page
				</Button>
			)}
			{/* {guestInfo && guestInfo?.songRequests.length > 0 && (
				<Accordion className="accordion-borderless" variant="outlined">
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography>Requested Songs</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{guestInfo?.songRequests.map((track) => (
							<p key={track}>{track}</p>
						))}
					</AccordionDetails>
				</Accordion>
			)} */}
			<div style={{ overflowY: 'auto', maxHeight: '250px' }}>
				{spotifyResults.map((track) => (
					<SpotifyCard
						track={track}
						handleSetSongRequest={handleSetSongRequest}
						key={track.id}
					/>
				))}
			</div>
		</>
	);
}
