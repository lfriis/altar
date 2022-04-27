import React from 'react';
import {
	Card,
	Box,
	CardContent,
	CardMedia,
	Typography,
	IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useGuestInfo } from '../store';

interface Props {
	track: SpotifyApi.TrackObjectFull;
	handleSetSongRequest?: (track: SpotifyApi.TrackObjectFull) => void;
}

export default function SpotifyCard({ track, handleSetSongRequest }: Props) {
	const guestInfo = useGuestInfo();
	const songExists = guestInfo?.songRequests.some((t) => t.id === track.id);

	return (
		<Card sx={{ display: 'flex', padding: '10px' }}>
			<CardMedia
				component="img"
				sx={{ height: 50, width: 50 }}
				image={track.album.images[0].url}
			/>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
			>
				<CardContent
					style={{
						padding: '0px 0px 0px 10px',
					}}
					sx={{ flex: '1 0 auto' }}
				>
					<Typography component="div" variant="subtitle2">
						{track.name}
					</Typography>
					<Typography
						variant="overline"
						color="text.secondary"
						component="div"
					>
						{track.artists[0].name}
					</Typography>
				</CardContent>
			</Box>
			{handleSetSongRequest && (
				<IconButton
					onClick={() => handleSetSongRequest(track)}
					disabled={
						!songExists && guestInfo?.songRequests.length === 3
					}
				>
					{songExists ? <Remove /> : <Add />}
				</IconButton>
			)}
		</Card>
	);
}
