import create from 'zustand';
import { Guest, GuestInfo, GoogleSheetGuestInfo } from '../interfaces';
import { Store } from './store.declarations';
import { updateGuest, fetchGuests } from './store.services';

const initialState = {
	guests: [],
	guestInfo: null,
	activeStep: 0,
	loading: false,
	guestsFoodSelectionsExist: null,
	rsvpStatus: null,
	offset: {
		previous: -20,
		next: 0,
	},
	responseError: null,
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
			set({ loading: true, responseError: null });
			await fetchGuests({ query, address })
				.then(
					({
						guestInfo,
						guestsFoodSelectionsExist,
					}: {
						guestInfo: GoogleSheetGuestInfo;
						guestsFoodSelectionsExist: boolean;
					}) => {
						set((state) => ({
							...state,
							guestInfo: new GuestInfo(guestInfo),
							guests: guestInfo.names.map(
								(guest) => new Guest(guest)
							),
							guestsFoodSelectionsExist,
							loading: false,
						}));
					}
				)
				.catch((e) => {
					set({
						...initialState,
						responseError: e.response.data.message,
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
		setRSVPStatus: (rsvpStatus: 'Success' | 'Error' | null) =>
			set((state) => ({
				...state,
				rsvpStatus,
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
		setResponseError: (responseError: string | null) =>
			set((state) => ({
				...state,
				responseError,
			})),
	})
);

// Store hooks
export const useLoading = () => useStore((state) => state.loading);
export const useGuests = () => useStore((state) => state.guests);
export const useGuestInfo = () => useStore((state) => state.guestInfo);
export const useOffset = () => useStore((state) => state.offset);
export const useGuestsFoodSelectionsExist = () =>
	useStore((state) => state.guestsFoodSelectionsExist);
export const useActiveStep = () => useStore((state) => state.activeStep);
export const useRSVPStatus = () => useStore((state) => state.rsvpStatus);
export const useResponseError = () => useStore((state) => state.responseError);
export const useSetResponseError = () =>
	useStore((state) => state.setResponseError);
export const useFetchGuests = () => useStore((state) => state.fetchGuests);
export const useSetUpdatedGuest = () =>
	useStore((state) => state.setUpdatedGuest);
export const useSetUpdatedGuestInfo = () =>
	useStore((state) => state.setUpdatedGuestInfo);
export const useSetRSVPStatus = () => useStore((state) => state.setRSVPStatus);
export const useSetOffset = () => useStore((state) => state.setOffset);
export const useSetGuests = () => useStore((state) => state.setGuests);
export const useSetNextStep = () => useStore((state) => state.setNextStep);
export const useSetPreviousStep = () =>
	useStore((state) => state.setPreviousStep);
