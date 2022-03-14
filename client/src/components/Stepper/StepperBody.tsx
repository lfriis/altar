import React from 'react';
import { Step } from '../../interfaces/Step';

export default function StepperBody({ step }: { step: Step }) {
	const { label, description, component: StepComponent } = step;

	return (
		<div>
			{label}

			<br />
			<br />
			{description}

			<StepComponent />
		</div>
	);
}
