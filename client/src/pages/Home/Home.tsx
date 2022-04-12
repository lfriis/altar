import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetGuests } from '../../store';

export default function Home() {
	const navigate = useNavigate();
	const setGuests = useSetGuests();
	const [loading, setLoading] = useState(false);

	const handleRetrieveGuestInfo = async () => {
		setLoading(true);

		const urlParams = new URLSearchParams(window.location.search);
		const query = urlParams.get('query');

		axios
			.post(`/api/guests`, {
				query,
			})
			.then((res) => {
				setGuests(res.data.guestInfo);
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		handleRetrieveGuestInfo();
	}, []);

	return (
		<div>
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

			{loading && <div>Loading...</div>}

			<Button onClick={handleRetrieveGuestInfo}>Test Auth</Button>
		</div>
	);
}
