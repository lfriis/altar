import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import checkIsIFramed from '../../utils';
import AutoAuth from './AutoAuth';
import LoginForm from './LoginForm';
import { useAuthState } from '../../context/auth';

export default function Login() {
	const isIFramed = checkIsIFramed();
	const location = useLocation();
	const navigate = useNavigate();
	const { authenticated } = useAuthState();

	useEffect(() => {
		if (authenticated) navigate('/');
	}, [authenticated]);

	const queryStrings = qs.parse(location.search, {
		ignoreQueryPrefix: true,
		decoder: (c) => c,
	});

	const key =
		typeof queryStrings.key === 'string'
			? (queryStrings.key as string)
			: undefined;

	const forward =
		typeof queryStrings.forward === 'string'
			? (queryStrings.forward as string)
			: undefined;

	const handleAuthSuccess = useCallback(() => {
		if (forward) navigate(forward);
		else navigate('/');
	}, [navigate]);

	return (
		<div>
			{isIFramed ? (
				<AutoAuth
					autoAuthKey={key}
					handleAuthSuccess={handleAuthSuccess}
				/>
			) : (
				<LoginForm handleAuthSuccess={handleAuthSuccess} />
			)}
		</div>
	);
}
