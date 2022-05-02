import React, { useState } from 'react';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarLink from './Navbar.Link';
import CollapseMenu from './CollapseMenu';

export default function Navbar() {
	const navigate = useNavigate();
	const [active, setActive] = useState<string | null>(null);
	const showCollapseMenu = useMediaQuery('(max-width:1000px)');

	return (
		<nav className="navbar">
			<Typography className="navbar__brand">
				{showCollapseMenu ? 'J & L' : 'JILLIAN & LARSEN'}
			</Typography>
			{showCollapseMenu ? (
				<CollapseMenu />
			) : (
				<div>
					<NavbarLink to="/" onClick={() => setActive('/')}>
						Wedding
					</NavbarLink>
					<NavbarLink
						to="/location"
						onClick={() => setActive('/location')}
					>
						Location
					</NavbarLink>
					<NavbarLink to="/gifts" onClick={() => setActive('/gifts')}>
						Gifts
					</NavbarLink>
					<NavbarLink
						to="/gallery"
						onClick={() => setActive('/gallery')}
					>
						Gallery
					</NavbarLink>
					<Button
						className={`rsvp-button ${
							active === '/rsvp' ? 'rsvp-button-active' : ''
						}`}
						variant="outlined"
						onClick={() => {
							navigate('/rsvp');
							setActive('/rsvp');
						}}
					>
						RSVP
					</Button>
				</div>
			)}
		</nav>
	);
}
