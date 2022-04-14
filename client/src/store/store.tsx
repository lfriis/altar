import create from 'zustand';
import { Guest, GuestInfo, GoogleSheetGuestInfo } from '../interfaces';
import { Store } from './store.declarations';
import { updateGuest, fetchGuests } from './store.services';

export const useStore = create<Store>(
	(set): Store => ({
		guests: [],
		guestInfo: null,
		activeStep: 0,
		loading: true,
		fetchGuests: async () => {
			const guestInfo = await fetchGuests();

			set((state) => ({
				...state,
				guestInfo: new GuestInfo(guestInfo),
				guests: guestInfo.names.map((guest) => new Guest(guest)),
				loading: false,
			}));
		},
		setGuests: (guestInfo: GoogleSheetGuestInfo) =>
			set((state) => ({
				...state,
				guestInfo: new GuestInfo(guestInfo),
				guests: guestInfo.names.map((guest) => new Guest(guest)),
			})),
		setUpdatedGuest: (updatedGuest: Guest) =>
			set((state) => ({
				...state,
				guests: updateGuest(state.guests, updatedGuest),
			})),
		setUpdatedGuestInfo: (updatedGuestInfo: GuestInfo) =>
			set((state) => ({
				...state,
				guestInfo: updatedGuestInfo,
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
export const useFetchGuests = () => useStore((state) => state.fetchGuests);
export const useSetUpdatedGuest = () =>
	useStore((state) => state.setUpdatedGuest);
export const useSetUpdatedGuestInfo = () =>
	useStore((state) => state.setUpdatedGuestInfo);
export const useSetGuests = () => useStore((state) => state.setGuests);
export const useSetNextStep = () => useStore((state) => state.setNextStep);
export const useSetPreviousStep = () =>
	useStore((state) => state.setPreviousStep);
