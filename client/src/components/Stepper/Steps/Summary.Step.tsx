import React from 'react';
import { RestaurantMenu } from '@mui/icons-material';
import { useGuests, useGuestInfo } from '../../../store';
import SpotifyCard from '../../Spotify.Card';

export default function SummaryStep() {
	const guests = useGuests();
	const guestInfo = useGuestInfo();

	return (
		<div>
			{guests.map(
				(guest) =>
					guest.name !== 'plus 1' &&
					guest.confirmed && (
						<div key={guest.name}>
							<h3 style={{ fontWeight: '900' }}>{guest.name}</h3>
							<div className="align-items-center">
								<RestaurantMenu
									style={{ paddingRight: '3px' }}
								/>
								<h4 style={{ margin: '1px 0 0 0' }}>
									{guest.foodOption.main}
								</h4>
							</div>
							<p style={{ marginBottom: '0' }}>
								{guest.foodOption.glutenFree && 'Gluten Free'}
							</p>

							<p style={{ margin: '0' }}>
								{guest.foodOption.vegan && 'Vegan'}
							</p>
							<p style={{ marginTop: '0' }}>
								{guest.foodOption.other &&
									`Other: ${guest.foodOption.other}`}
							</p>
						</div>
					)
			)}

			{guestInfo && guestInfo?.songRequests.length > 0 ? (
				<div style={{ padding: '8px 0px 0px' }}>
					<h4>Song Requests</h4>
					{guestInfo?.songRequests.map((song) => (
						<div key={song.id}>
							<SpotifyCard track={song} key={song.id} />
						</div>
					))}
				</div>
			) : (
				<div className="justify-content">
					<br />
					<br />
					You suggested no songs, so we&apos;ll play a few for you!
				</div>
			)}
		</div>
	);
}
