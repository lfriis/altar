import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<Button
				variant="contained"
				onClick={() => navigate('/')}
				style={{ marginLeft: 'auto' }}
			>
				View schedule
			</Button>
		</nav>
	);
}
