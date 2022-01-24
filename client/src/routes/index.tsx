import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateOutlet from './PrivateOutlet';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import PrivatePage from '../pages/Private';
import Friises from '../pages/Couples';

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/jillian-and-larsen" element={<Friises />} />
			<Route path="/private" element={<PrivateOutlet />}>
				<Route path="" element={<PrivatePage />} />
			</Route>
		</Routes>
	);
}
