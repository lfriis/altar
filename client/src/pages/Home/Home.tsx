import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetchGuests, useGuests } from '../../store';

export default function Home() {
	const navigate = useNavigate();
	const guests = useGuests();
	const fetchGuests = useFetchGuests();

	useEffect(() => {
		if (guests.length === 0) fetchGuests();
	}, [guests]);

	return (
		<div className="home-page">
			<div className="home-page-content">
				<p style={{ fontSize: '50px', letterSpacing: '0.1em' }}>
					JILLIAN & LARSEN
				</p>
				<p style={{ fontSize: '30px', letterSpacing: '0.1em' }}>
					July 2, 2022 - Sprucewood Shores Estate Winery
				</p>
				<Button
					className="rsvp-button"
					variant="outlined"
					onClick={() => navigate('/rsvp')}
				>
					RSVP
				</Button>
			</div>
		</div>
	);
}
