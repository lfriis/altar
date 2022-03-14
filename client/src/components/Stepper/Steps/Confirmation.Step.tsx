import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useGuests } from '../../../store';

export default function ConfirmationStep() {
	const guests = useGuests();
	const [confirmedGuest, setConfirmedGuest] = useState(false);

	useEffect(() => {
		console.log(confirmedGuest);
	}, [confirmedGuest]);

	return (
		<div>
			{guests ? (
				guests.names.map((guest) => (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<h4>{guest}</h4>
						<Button onClick={() => setConfirmedGuest(true)}>
							Im coming
						</Button>
						<Button onClick={() => setConfirmedGuest(false)}>
							Cant come
						</Button>
					</div>
				))
			) : (
				<h4>No info on guest</h4>
			)}
		</div>
	);
}
