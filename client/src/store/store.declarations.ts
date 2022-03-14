import { Guests } from '../interfaces/Guests';

export type Store = {
	guests: Guests | null;
	activeStep: number;
	setGuests: (guests: Guests) => void;
	setNextStep: (activeStep: number) => void;
	setPreviousStep: (activeStep: number) => void;
};
