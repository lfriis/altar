import jwt from 'jsonwebtoken';

/**
 * * Overriding default JWT payload to include custom types
 */
declare module 'jsonwebtoken' {
	export interface AuthPayload extends jwt.JwtPayload {
		address: string;
	}
}

export interface SpotifySong {
	id: string;
	name: string;
	artists: {
		name: string;
	}[];
}

export interface GuestInfo {
	address: string;

	city: string;

	country: string;

	postalCode: string;

	province: string;

	names: string[];

	envelope: string;

	email: string | null;

	songRequests: any[];
}

export interface Guests {
	name: string;

	confirmed: boolean | null;

	foodOption: {
		main: string | null;
		glutenFree: boolean | null;
		vegan: boolean | null;
		other: string | null;
	};

	plusOne: boolean;

	edit: boolean;
}

export interface GuestRow {
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

export interface GuestFoodRow {
	name: string;
	main: string;
	vegan: string;
	glutenFree: string;
	other: string;
	confirmed: string;
}
