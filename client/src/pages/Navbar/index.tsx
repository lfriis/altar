import React from 'react';
import { Button } from '@mui/material';
import { useGuests, useGuestInfo } from '../../store';

export default function Navbar() {
	const guests = useGuests();
	const guestInfo = useGuestInfo();

	return (
		<nav className="navbar">
			<Button
				variant="contained"
				onClick={() => console.log({ guests, guestInfo })}
				style={{ marginLeft: 'auto' }}
			>
				View store
			</Button>
		</nav>
	);
}
