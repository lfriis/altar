import React from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../context/auth';
import checkIsIFramed from '../../utils';
import AccountMenu from './AccountMenu';

export default function Navbar() {
	const userState = useAuthState();
	const location = useLocation();
	const navigate = useNavigate();
	const isIFramed = checkIsIFramed();

	return (
		<nav className="navbar">
			{location.pathname !== '/' ? (
				<>
					{!isIFramed && userState.authenticated && <AccountMenu />}

					{!userState.authenticated && (
						<Button
							variant="contained"
							onClick={() => navigate('/')}
							style={{ marginLeft: 'auto' }}
						>
							See samples
						</Button>
					)}
				</>
			) : (
				<Button
					variant="contained"
					onClick={() => navigate('/login')}
					style={{ marginLeft: 'auto' }}
				>
					Login
				</Button>
			)}
		</nav>
	);
}
