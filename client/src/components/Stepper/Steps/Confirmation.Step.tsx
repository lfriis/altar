import React from 'react';
import { useGuests } from '../../../store';
import ConfirmToggle from '../../Confirm.Toggle';

export default function ConfirmationStep() {
	const guests = useGuests();

	return (
		<div>
			{guests &&
				guests.map((guest) => (
					<div key={guest.name}>
						<h4>{guest.name}</h4>

						<ConfirmToggle guest={guest} />
					</div>
				))}
		</div>
	);
}
