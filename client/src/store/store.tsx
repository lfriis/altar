import create from 'zustand';
import { Guest, GuestInfo, GoogleSheetGuestInfo } from '../interfaces';
import { Store } from './store.declarations';
import { updateGuest, fetchGuests } from './store.services';

const initialState = {
	guests: [],
	guestInfo: null,
	activeStep: 0,
	loading: false,
	offset: {
		previous: -20,
		next: 0,
	},
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
		setOffset: (offset: number, paginationOperation: 'Previous' | 'Next') =>
			set((state) => ({
				...state,
				offset: {
					previous:
						paginationOperation === 'Previous'
							? state.offset.previous - 20
							: state.offset.next - 20,
					next: offset,
				},
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
export const useGuests = () => useStore((state) => state.guests);
export const useGuestInfo = () => useStore((state) => state.guestInfo);
export const useOffset = () => useStore((state) => state.offset);
export const useActiveStep = () => useStore((state) => state.activeStep);
export const useFetchGuests = () => useStore((state) => state.fetchGuests);
export const useSetUpdatedGuest = () =>
	useStore((state) => state.setUpdatedGuest);
export const useSetUpdatedGuestInfo = () =>
	useStore((state) => state.setUpdatedGuestInfo);
export const useSetOffset = () => useStore((state) => state.setOffset);
export const useSetGuests = () => useStore((state) => state.setGuests);
export const useSetNextStep = () => useStore((state) => state.setNextStep);
export const useSetPreviousStep = () =>
	useStore((state) => state.setPreviousStep);
