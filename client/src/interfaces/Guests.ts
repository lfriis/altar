export class Guest {
	readonly name: string;

	confirmed: boolean | null;

	foodOption: {
		main: string | null;
		glutenFree: boolean | null;
		vegan: boolean | null;
		other: string | null;
	};

	constructor(guest: string) {
		this.name = guest;
		this.confirmed = null;
		this.foodOption = {
			main: null,
			glutenFree: null,
			vegan: null,
			other: null,
		};
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
