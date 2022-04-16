import React, { useState, useCallback, useRef } from 'react';
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
import {
	useGuestInfo,
	useSetUpdatedGuestInfo,
	useOffset,
	useSetOffset,
} from '../../../store';
import { parseURL } from '../../../utils';

export default function SongRequestStep() {
	const guestInfo = useGuestInfo();
	const offset = useOffset();
	const updateGuestInfo = useSetUpdatedGuestInfo();
	const setOffset = useSetOffset();

	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [spotifyResults, setSpotifyResults] = useState<
		SpotifyApi.TrackObjectFull[]
	>([]);
	const paginationOperation = useRef<'Previous' | 'Next'>('Next');

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

				setOffset(
					parseInt(
						parseURL(res.data.searchResults.tracks.next).offset,
						10
					),
					paginationOperation.current
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

	const handleSetSongRequest = (track: SpotifyApi.TrackObjectFull) => {
		if (guestInfo) {
			if (!guestInfo?.songRequests.some((t) => t.id === track.id)) {
				const editedGuestInfo = guestInfo.clone();
				editedGuestInfo.songRequests = [
					...editedGuestInfo.songRequests,
					track,
				];
				updateGuestInfo(editedGuestInfo);
			} else {
				const editedGuestInfo = guestInfo.clone();
				editedGuestInfo.songRequests =
					editedGuestInfo.songRequests.filter(
						(t) => t.id !== track.id
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
						setOffset(0, 'Next');
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
			<Button
				disabled={loading || offset.previous === -20}
				onClick={() => {
					searchSpotify(searchTerm, offset.previous);
					paginationOperation.current = 'Previous';
				}}
			>
				See Previous Page
			</Button>
			<Button
				disabled={loading || offset.next === 0}
				onClick={() => {
					searchSpotify(searchTerm, offset.next);
					paginationOperation.current = 'Next';
				}}
			>
				See Next Page
			</Button>
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
