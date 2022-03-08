export type Store = {
	activeStep: number;
	setNextStep: (activeStep: number) => void;
	setPreviousStep: (activeStep: number) => void;
};
