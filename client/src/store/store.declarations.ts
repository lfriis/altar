import { Guest, GuestInfo } from '../interfaces/Guests';

export type Store = {
	guestInfo: GuestInfo | null;
	guests: Guest[] | null;
	activeStep: number;
	setGuests: (guestInfo: GuestInfo) => void;
	setNextStep: (activeStep: number) => void;
	setPreviousStep: (activeStep: number) => void;
};
