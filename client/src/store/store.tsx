import create from 'zustand';
import { Store } from './store.declarations';

export const useStore = create<Store>(
	(set): Store => ({
		activeStep: 0,
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
export const useSetNextStep = () => useStore((state) => state.setNextStep);
export const useSetPreviousStep = () =>
	useStore((state) => state.setPreviousStep);
