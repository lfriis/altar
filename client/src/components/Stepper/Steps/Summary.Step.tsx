import React from 'react';
import { useGuests, useGuestInfo } from '../../../store';

export default function SummaryStep() {
	const guests = useGuests();
	const guestInfo = useGuestInfo();

	console.log(guestInfo, guests);

	return (
		<div>
			<h4>Guests Selections</h4>
			{guests.map(
				(guest) =>
					guest.name !== 'plus 1' && (
						<div key={guest.name}>
							<p>{guest.name}</p>
							<p>{guest.foodOption.main}</p>
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

			<h4>Email</h4>
			<p>{guestInfo?.email}</p>
			<br />

			<h4>Songs Requested</h4>
			{guestInfo?.songRequests.map((song) => (
				<div key={song.id}>
					<p>{song.name}</p>
				</div>
			))}
		</div>
	);
}
