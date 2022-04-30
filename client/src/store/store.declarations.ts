import { Guest, GuestInfo, GoogleSheetGuestInfo } from '../interfaces';

export type Store = {
	guestInfo: GuestInfo | null;
	guests: Guest[];
	activeStep: number;
	loading: boolean;
	guestsFoodSelectionsExist: boolean | null;
	rsvpStatus: 'Success' | 'Error' | null;
	responseError: string | null;
	offset: {
		previous: number;
		next: number;
	};
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
	setRSVPStatus: (rsvpStatus: 'Success' | 'Error' | null) => void;
	setOffset: (
		nextOffset: number,
		paginationOperation: 'Previous' | 'Next'
	) => void;
	setPreviousStep: (activeStep: number) => void;
	setResponseError: (responseError: string | null) => void;
};
