export interface GuestInfo {
	address: string;
	city: string;
	country: string;
	postal_code: string;
	province: string;
	name_1: string;
	name_2: string;
	name_3: string;
	name_4: string;
	names: string[];
	envelope: string;
}

export class Guest {
	name: string;

	confirmed: boolean | null;

	foodOption: string | null;

	email: string | null;

	constructor(guest: string) {
		this.name = guest;
		this.confirmed = null;
		this.foodOption = null;
		this.email = null;
	}
}

export interface ConfirmedGuest {
	guestName: string;
	foodSelection: string | null;
}
