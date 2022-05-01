import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
	TextField,
	InputAdornment,
	CircularProgress,
	Button,
} from '@mui/material';
import { Search, NavigateNext } from '@mui/icons-material';
import SpotifyCard from '../../Spotify.Card';
import {
	useGuestInfo,
	useSetUpdatedGuestInfo,
	useOffset,
	useSetOffset,
} from '../../../store';
import { parseURL } from '../../../utils';
import DropdownAccordion from '../../Dropdown.Accordion';

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
			.finally(() => {
				setLoading(false);
			});
	};

	const debouncedFilterFunction = useCallback(
		_.debounce(searchSpotify, 500),
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

				const filteredSpotifyResults = spotifyResults.filter(
					(t) => t.id !== track.id
				);
				setSpotifyResults(filteredSpotifyResults);
			} else {
				const editedGuestInfo = guestInfo.clone();
				editedGuestInfo.songRequests =
					editedGuestInfo.songRequests.filter(
						(t) => t.id !== track.id
					);
				updateGuestInfo(editedGuestInfo);

				if (spotifyResults.length === 0) {
					setSpotifyResults([...spotifyResults]);
				} else setSpotifyResults([track, ...spotifyResults]);
			}
		}
	};

	return (
		<>
			<TextField
				size="small"
				variant="outlined"
				placeholder="Search Spotify..."
				style={{ paddingBottom: '20px' }}
				disabled={loading}
				fullWidth
				onChange={(e) => {
					if (e.target.value === '') {
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
					endAdornment: (
						<InputAdornment position="end">
							{searchTerm.length > 0 && loading && (
								<CircularProgress size={20} />
							)}
						</InputAdornment>
					),
				}}
				helperText={
					spotifyResults.length > 0 &&
					`${spotifyResults.length} results`
				}
			/>

			{guestInfo && guestInfo?.songRequests.length > 0 && (
				<DropdownAccordion
					accordionTitle={`Selected Songs (${guestInfo?.songRequests.length}/3)`}
				>
					{guestInfo?.songRequests.map((track) => (
						<SpotifyCard
							track={track}
							handleSetSongRequest={handleSetSongRequest}
							key={track.id}
						/>
					))}
				</DropdownAccordion>
			)}

			<div style={{ maxHeight: '400px' }}>
				{spotifyResults.map((track) => (
					<SpotifyCard
						track={track}
						handleSetSongRequest={handleSetSongRequest}
						key={track.id}
					/>
				))}
				{spotifyResults.length > 0 && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							paddingBottom: '50px',
						}}
					>
						<Button
							disabled={loading || offset.previous === -20}
							onClick={() => {
								searchSpotify(searchTerm, offset.previous);
								paginationOperation.current = 'Previous';
							}}
							startIcon={
								<NavigateNext
									style={{ transform: 'rotate(180deg)' }}
								/>
							}
						>
							See Previous
						</Button>
						<Button
							disabled={loading || offset.next === 0}
							onClick={() => {
								searchSpotify(searchTerm, offset.next);
								paginationOperation.current = 'Next';
							}}
							endIcon={<NavigateNext />}
						>
							See Next
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
