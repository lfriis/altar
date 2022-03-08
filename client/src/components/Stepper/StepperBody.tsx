import React from 'react';
import { Steps } from './Stepper';

export interface Stepper {
	steps: Steps[];
	activeStep: number;
}

export default function StepperBody({ steps, activeStep }: Stepper) {
	return (
		<div>
			{steps[activeStep].label}

			<br />
			<br />

			{steps[activeStep].description}
		</div>
	);
}
