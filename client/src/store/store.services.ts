import axios from 'axios';
import { GoogleSheetGuestInfo, Guest } from '../interfaces';

export function updateGuest(guests: Guest[], updatedGuest: Guest): Guest[] {
	return guests.map((guest) => {
		if (guest.name === updatedGuest.name) {
			return updatedGuest;
		}
		return guest;
	});
}

export async function fetchGuests(): Promise<GoogleSheetGuestInfo> {
	const urlParams = new URLSearchParams(window.location.search);
	const query = urlParams.get('query');

	const res = await axios({
		url: '/api/guests',
		method: 'post',
		data: { query },
	});

	return res.data.guestInfo;
}
