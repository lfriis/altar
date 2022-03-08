/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MobileStepper, Button } from '@mui/material';
import {
	KeyboardArrowLeft,
	KeyboardArrowRight,
	Check,
} from '@mui/icons-material';
import { useActiveStep, useSetNextStep, useSetPreviousStep } from '../../store';
import StepperBody from './StepperBody';

export interface Steps {
	label: string;
	description: string;
	completed: boolean;
}

const steps = [
	{
		label: 'Guest Confirmation',
		description: 'Guest confirmation description',
		completed: false,
	},
	{
		label: 'Select food option',
		description: 'Select food description',
		completed: false,
	},
	{
		label: 'Enter email address',
		description: 'Email address description',
		completed: false,
	},
	{
		label: 'Completed',
		description: '',
		completed: false,
	},
];

export default function Stepper() {
	const activeStep = useActiveStep();
	const setNextStep = useSetNextStep();
	const setPreviousStep = useSetPreviousStep();

	return (
		<>
			<MobileStepper
				variant="progress"
				steps={steps.length}
				position="static"
				activeStep={activeStep}
				sx={{ width: 800, maxWidth: 400, flexGrow: 1 }}
				nextButton={
					activeStep === 3 ? (
						<Button>
							Done
							<Check />
						</Button>
					) : (
						<Button onClick={() => setNextStep(activeStep)}>
							Next
							<KeyboardArrowRight />
						</Button>
					)
				}
				backButton={
					<Button
						size="small"
						onClick={() => setPreviousStep(activeStep)}
						disabled={activeStep === 0}
					>
						<KeyboardArrowLeft />
						Back
					</Button>
				}
			/>
			<StepperBody steps={steps} activeStep={activeStep} />
		</>
	);
}
