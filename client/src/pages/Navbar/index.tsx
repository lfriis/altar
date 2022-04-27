import React from 'react';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarLink from './Navbar.Link';
import CollapseMenu from './CollapseMenu';

export default function Navbar() {
	const navigate = useNavigate();
	const showCollapseMenu = useMediaQuery('(max-width:800px)');

	return (
		<nav className="navbar">
			<Typography className="navbar__brand">JILLIAN & LARSEN</Typography>
			{showCollapseMenu ? (
				<CollapseMenu />
			) : (
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
			)}
		</nav>
	);
}
