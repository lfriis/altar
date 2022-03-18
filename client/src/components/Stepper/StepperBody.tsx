import React from 'react';
import { Step } from '../../interfaces/Step';

export default function StepperBody({ step }: { step: Step }) {
	const { label, component: StepComponent } = step;

	return (
		<>
			<div>
				<h4>{label}</h4>
			</div>
			<StepComponent />
		</>
	);
}
