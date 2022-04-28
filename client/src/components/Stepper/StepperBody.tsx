import React from 'react';
import { Step } from '../../interfaces/Step';

export default function StepperBody({ step }: { step: Step }) {
	const { label, component: StepComponent } = step;

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '30px',
				}}
			>
				<h1>RSVP</h1>
				<h3 style={{ padding: '0px', margin: '0px' }}>{label}</h3>
			</div>
			<div>
				<StepComponent />
			</div>
		</div>
	);
}
