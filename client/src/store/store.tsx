import create from 'zustand';
import { Guests } from '../interfaces';
import { Store } from './store.declarations';

export const useStore = create<Store>(
	(set): Store => ({
		guests: null,
		activeStep: 0,
		setGuests: (retrievedGuests: Guests) =>
			set((state) => ({
				...state,
				guests: retrievedGuests,
			})),
		setNextStep: (activeStep: number) =>
			set((state) => ({
				...state,
				activeStep: activeStep + 1,
			})),
		setPreviousStep: (activeStep: number) =>
			set((state) => ({
				...state,
				activeStep: activeStep - 1,
			})),
	})
);

// Store hooks
export const useActiveStep = () => useStore((state) => state.activeStep);
export const useGuests = () => useStore((state) => state.guests);
export const useSetGuests = () => useStore((state) => state.setGuests);
export const useSetNextStep = () => useStore((state) => state.setNextStep);
export const useSetPreviousStep = () =>
	useStore((state) => state.setPreviousStep);
