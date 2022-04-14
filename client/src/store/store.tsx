import create from 'zustand';
import { Guest, GuestInfo, GoogleSheetGuestInfo } from '../interfaces';
import { Store } from './store.declarations';
import { updateGuest, fetchGuests } from './store.services';

const initialState = {
	guests: [],
	guestInfo: null,
	activeStep: 0,
	loading: false,
};

export const useStore = create<Store>(
	(set): Store => ({
		...initialState,
		fetchGuests: async ({
			query,
			address,
		}: {
			query?: string;
			address?: string;
		}) => {
			set({ loading: true });
			await fetchGuests({ query, address })
				.then((guestInfo) => {
					set((state) => ({
						...state,
						guestInfo: new GuestInfo(guestInfo),
						guests: guestInfo.names.map(
							(guest) => new Guest(guest)
						),
						loading: false,
					}));
				})
				.catch(() => {
					set({
						...initialState,
					});
				});
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
export const useLoading = () => useStore((state) => state.loading);
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
