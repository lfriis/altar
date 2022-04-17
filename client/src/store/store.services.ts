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
	// const query =
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMTI5NCBIZXJpdGFnZSBSb2FkIiwiaWF0IjoxNjQ5ODkzNjA2fQ.I6w4e1bnVmzEjKI4aE36kOFUHlehnFCwjw_yFdRmdnA';

	const res = await axios({
		url: '/api/guests',
		method: 'post',
		data: { query, address },
	});

	return res.data;
}
