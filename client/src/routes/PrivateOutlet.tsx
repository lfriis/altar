import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../context/auth';

export default function PrivateOutlet() {
	const { authenticated } = useAuthState();

	const location = useLocation();

	return authenticated ? (
		<Outlet />
	) : (
		<Navigate
			to={{
				pathname: `/login?forward=${location.pathname}`,
			}}
		/>
	);
}
