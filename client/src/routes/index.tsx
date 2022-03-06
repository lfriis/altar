/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CouplesForm } from '../pages/Couples';

import FriisesConfig from '../pages/Couples/Friises';

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<CouplesForm {...FriisesConfig} />} />
		</Routes>
	);
}
