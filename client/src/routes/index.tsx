/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import GuestForm from '../pages/Couples';

import FriisesConfig from '../pages/Couples/Friises';

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route
				path="/couples/friises"
				element={<GuestForm {...FriisesConfig} />}
			/>
		</Routes>
	);
}
