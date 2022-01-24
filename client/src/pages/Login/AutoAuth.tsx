import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { loginUser, useAuthState, useAuthDispatch } from '../../context/auth';
// import AutoAuthError from '../../components/Alerts/AutoAuthError';
import { IAutoAuthProps } from './login.declarations';
import config from '../../config.json';

async function getToken(ufKey: string) {
	if (!ufKey) throw new Error();
	const result = await Axios({
		url: 'https://flipbot.pro/token/',
		method: 'POST',
		data: {
			ufKey,
		},
		withCredentials: false,
	});

	return result;
}

export default function AutoAuth({
	handleAuthSuccess,
	autoAuthKey,
}: IAutoAuthProps) {
	const dispatch = useAuthDispatch();
	const { loading } = useAuthState();
	const [authError, setAuthError] = useState(false);

	const devURLs = ['localhost', '127.0.0.1'];
	const inDev = new RegExp(devURLs.join('|')).test(window.location.origin);

	useEffect(() => {
		if (!autoAuthKey) return;
		getToken(autoAuthKey)
			.then((res) => {
				loginUser(dispatch, undefined, res.data.token)
					.then(() => {
						handleAuthSuccess();
					})
					.catch((e) => {
						setAuthError(true);
						console.log('Login error', e);
					});
			})
			.catch((e) => {
				setAuthError(true);
				console.log(e);
			});
	}, [dispatch, autoAuthKey, handleAuthSuccess]);

	// if (authError) return <AutoAuthError></AutoAuthError>;
	if (config.appName === 'template')
		throw new Error(
			'Forgot to redefine appName in config.json. Should match auto auth server whitelist',
		);
	if (authError) return <div>Error</div>;
	if (loading) return <div />;
	if (!autoAuthKey) {
		if (inDev) {
			return (
				<div>
					<p>
						[Local development] won&apos;t redirect to the auto auth
						server (flipbot.pro/auth)
					</p>

					<p>1. Hit the auto server manually in a new tab.</p>
					<pre>
						{`Ex. https://flipbot.pro/auth?appName=${config.appName}`}
					</pre>
					<p>2. Copy the ?key into /login?key=....</p>
					<pre>
						Ex.
						http://localhost:3000/login?key=L7X3hOJHW9EB8luxboOMNK8A3SKWj7GG8GFl+...+cUxLHmps0/LQEA==
					</pre>
				</div>
			);
		}
		window.location.href = `https://flipbot.pro/auth?appName=${config.appName}`;
	}
	return <div />;
}

export {};
