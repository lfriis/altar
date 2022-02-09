export interface ICoupleConfig {
	coupleName: string;
	marriedName: string;
	coupleInitials: string;
	foodOptions: string[];
}

export interface IGuests {
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
	envolope: string;
}

export interface IConfirmedGuest {
	guestName: string;
	foodSelection: string | null;
}
