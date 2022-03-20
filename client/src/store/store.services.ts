import { Guest } from '../interfaces';

export default function updateGuest(
	guests: Guest[],
	updatedGuest: Guest
): Guest[] {
	return guests.map((guest) => {
		if (guest.name === updatedGuest.name) {
			return updatedGuest;
		}
		return guest;
	});
}
