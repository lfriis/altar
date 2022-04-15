import { v4 as uuidv4 } from 'uuid';

export class Guest {
	readonly id: string;

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

	constructor(guest: string) {
		this.id = uuidv4();
		this.name = guest;
		this.confirmed = null;
		this.foodOption = {
			main: null,
			glutenFree: null,
			vegan: null,
			other: null,
		};
		this.plusOne = guest === 'plus 1';
		this.edit = false;
	}

	clone() {
		const clone: Guest = Object.assign(
			Object.create(Object.getPrototypeOf(this)),
			this
		);

		return clone;
	}
}

export interface ConfirmedGuest {
	guestName: string;
	foodSelection: string | null;
}
