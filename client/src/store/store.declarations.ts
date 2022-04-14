import { Guest, GuestInfo, GoogleSheetGuestInfo } from '../interfaces';

export type Store = {
	guestInfo: GuestInfo | null;
	guests: Guest[];
	activeStep: number;
	loading: boolean;
	fetchGuests: ({
		query,
		address,
	}: {
		query?: string;
		address?: string;
	}) => void;
	setGuests: (guestInfo: GoogleSheetGuestInfo) => void;
	setUpdatedGuest: (updatedGuest: Guest) => void;
	setUpdatedGuestInfo: (updatedGuestInfo: GuestInfo) => void;
	setNextStep: (activeStep: number) => void;
	setPreviousStep: (activeStep: number) => void;
};
