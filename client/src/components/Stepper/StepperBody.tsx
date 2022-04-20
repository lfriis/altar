import React from 'react';
import { Step } from '../../interfaces/Step';

export default function StepperBody({ step }: { step: Step }) {
	const { label, component: StepComponent } = step;

	return (
		<>
			<div>
				<h2 style={{ paddingTop: '20px' }}>{label}</h2>
			</div>
			<StepComponent />
		</>
	);
}
