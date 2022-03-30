import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();

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
		</div>
	);
}
