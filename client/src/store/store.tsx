import create from 'zustand';
import { Guest, GuestInfo } from '../interfaces';
import { Store } from './store.declarations';

export const useStore = create<Store>(
	(set): Store => ({
		guests: null,
		guestInfo: null,
		activeStep: 0,
		setGuests: (guestInfo: GuestInfo) =>
			set((state) => ({
				...state,
				guestInfo,
				guests: guestInfo.names.map((guest) => new Guest(guest)),
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
export const useGuestInfo = () => useStore((state) => state.guestInfo);
export const useSetGuests = () => useStore((state) => state.setGuests);
export const useSetNextStep = () => useStore((state) => state.setNextStep);
export const useSetPreviousStep = () =>
	useStore((state) => state.setPreviousStep);
