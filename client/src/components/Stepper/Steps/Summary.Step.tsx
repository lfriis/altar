import React from 'react';
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
							<h3>{guest.name}</h3>
							<h5>{guest.foodOption.main}</h5>
							<p>
								{guest.foodOption.glutenFree && 'Gluten Free'}
							</p>

							<p>{guest.foodOption.vegan && 'Vegan'}</p>
							<p>
								{guest.foodOption.other &&
									`Other: ${guest.foodOption.other}`}
							</p>
						</div>
					)
			)}

			{guestInfo && guestInfo?.songRequests.length > 0 && (
				<div style={{ padding: '8px 16px 16px' }}>
					<h4>Song Requests</h4>
					{guestInfo?.songRequests.map((song) => (
						<div key={song.id}>
							<SpotifyCard track={song} key={song.id} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
