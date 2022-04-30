import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGuests, useFetchGuests } from '../../store';
import { getQueryParam } from '../../utils';

export default function Home() {
	const navigate = useNavigate();
	const guests = useGuests();
	const fetchGuests = useFetchGuests();

	useEffect(() => {
		const query = getQueryParam(window.location.search);
		if (guests.length === 0 && query) fetchGuests({ query });
	}, [guests]);

	return (
		<section className="home">
			<div className="landing-wrapper-content">
				<p className="landing-wrapper-header">JILLIAN & LARSEN</p>
				<p className="landing-wrapper-subheading">
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
		</section>
	);
}
