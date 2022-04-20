import React from 'react';
import { useGuests, useGuestInfo } from '../../../store';
import SpotifyCard from '../../Spotify.Card';

export default function SummaryStep() {
	const guests = useGuests();
	const guestInfo = useGuestInfo();

	return (
		<div>
			<br />
			{guests.map(
				(guest) =>
					guest.name !== 'plus 1' && (
						<div key={guest.name}>
							<h2>{guest.name}</h2>
							<h5>{guest.foodOption.main}</h5>
							<p>
								{guest.foodOption.glutenFree && 'Gluten Free'}
							</p>

							<p>{guest.foodOption.vegan && 'Vegan'}</p>
							<p>
								{guest.foodOption.other &&
									`Other: ${guest.foodOption.other}`}
							</p>

							<br />
						</div>
					)
			)}

			{guestInfo?.email && (
				<>
					<h4>Email</h4>
					<p>{guestInfo?.email}</p>
					<br />
				</>
			)}

			{guestInfo && guestInfo?.songRequests.length > 0 && (
				<>
					<h4>Songs Requested</h4>
					{guestInfo?.songRequests.map((song) => (
						<div key={song.id}>
							<SpotifyCard track={song} key={song.id} />
						</div>
					))}
				</>
			)}
		</div>
	);
}
