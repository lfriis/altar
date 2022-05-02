import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RSVP } from '../pages/RSVP';
import { Home } from '../pages/Home';
import { Location } from '../pages/Location';
import { Gallery } from '../pages/Gallery';
import { Gifts } from '../pages/Gifts';

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/rsvp" element={<RSVP />} />
			<Route path="/location" element={<Location />} />
			<Route path="/gallery" element={<Gallery />} />
			<Route path="/gifts" element={<Gifts />} />
		</Routes>
	);
}
