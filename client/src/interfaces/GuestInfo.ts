export interface GoogleSheetGuestInfo {
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
	email: string | null;
}

export class GuestInfo {
	address: string;

	city: string;

	country: string;

	postalCode: string;

	province: string;

	names: string[];

	envelope: string;

	email: string | null;

	constructor(g: GoogleSheetGuestInfo) {
		this.address = g.address;
		this.city = g.city;
		this.country = g.country;
		this.postalCode = g.postal_code;
		this.province = g.province;
		this.names = g.names;
		this.envelope = g.envelope;
		this.email = null;
	}

	clone() {
		const clone: GuestInfo = Object.assign(
			Object.create(Object.getPrototypeOf(this)),
			this
		);

		return clone;
	}
}
