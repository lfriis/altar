/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CouplesForm } from '../pages/Couples';
import { Home } from '../pages/Home';
import { Location } from '../pages/Location';
import { Gifts } from '../pages/Gifts';
import FriisesConfig from '../pages/Couples/Friises';

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/rsvp" element={<CouplesForm {...FriisesConfig} />} />
			<Route path="/location" element={<Location />} />
			<Route path="/gifts" element={<Gifts />} />
		</Routes>
	);
}
