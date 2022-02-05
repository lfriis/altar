/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateOutlet from './PrivateOutlet';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import PrivatePage from '../pages/Private';
import GuestForm from '../pages/Couples';

import FriisesConfig from '../pages/Couples/Friises';

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route
				path="/couples/friises"
				element={<GuestForm {...FriisesConfig} />}
			/>
			<Route path="/private" element={<PrivateOutlet />}>
				<Route path="" element={<PrivatePage />} />
			</Route>
		</Routes>
	);
}
