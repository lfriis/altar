import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarLink from './Navbar.Link';

export default function Navbar() {
	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<Typography className="navbar__brand">JILLIAN & LARSEN</Typography>
			<div>
				<NavbarLink to="/">Wedding</NavbarLink>
				<NavbarLink to="/location">Location</NavbarLink>
				<NavbarLink to="/gifts">Gifts</NavbarLink>
				<Button
					className="rsvp-button"
					variant="outlined"
					onClick={() => navigate('/rsvp')}
				>
					RSVP
				</Button>
			</div>
		</nav>
	);
}
