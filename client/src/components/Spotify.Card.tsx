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
	handleSetSongRequest: (trackId: string) => void;
}

export default function SpotifyCard({ track, handleSetSongRequest }: Props) {
	// const [, previewSong] = useAudio(track.preview_url);
	const guestInfo = useGuestInfo();
	const songExists = guestInfo?.songRequests.includes(track.id);

	return (
		<Card sx={{ display: 'flex', padding: '10px' }}>
			<CardMedia
				component="img"
				sx={{ height: 60, width: 60 }}
				image={track.album.images[0].url}
			/>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent
					style={{
						padding: '0px 0px 0px 10px',
					}}
					sx={{ flex: '1 0 auto' }}
				>
					<Typography component="div" variant="h5">
						{track.name}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						{track.artists[0].name}
					</Typography>
				</CardContent>
			</Box>
			<IconButton
				onClick={() => handleSetSongRequest(track.id)}
				disabled={!songExists && guestInfo?.songRequests.length === 3}
			>
				{songExists ? <Remove /> : <Add />}
			</IconButton>
		</Card>
	);
}
