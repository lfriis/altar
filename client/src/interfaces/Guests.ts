export interface CoupleConfig {
	coupleName: string;
	marriedName: string;
	coupleInitials: string;
	foodOptions: string[];
}

export interface Guests {
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

export interface ConfirmedGuest {
	guestName: string;
	foodSelection: string | null;
}
