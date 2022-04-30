import axios from 'axios';
import { Guest } from '../interfaces';

export function updateGuest(guests: Guest[], updatedGuest: Guest): Guest[] {
	return guests.map((guest) => {
		if (guest.id === updatedGuest.id) {
			return updatedGuest;
		}
		return guest;
	});
}

export async function fetchGuests({
	query,
	address,
}: {
	query?: string;
	address?: string;
}) {
	const res = await axios({
		url: '/api/guests',
		method: 'post',
		data: { query, address },
	});

	return res.data;
}
