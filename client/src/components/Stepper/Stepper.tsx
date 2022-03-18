/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MobileStepper, Button } from '@mui/material';
import {
	KeyboardArrowLeft,
	KeyboardArrowRight,
	Check,
} from '@mui/icons-material';
import ActiveStep from './StepperBody';
import {
	ConfirmationStep,
	FoodSelectionStep,
	EmailAddressStep,
	SummaryStep,
} from './Steps';
import { Step } from '../../interfaces';
import { useActiveStep, useSetNextStep, useSetPreviousStep } from '../../store';

const steps: Step[] = [
	{
		label: 'Please kindly respond by the first of April',
		completed: false,
		component: ConfirmationStep,
	},
	{
		label: 'Select food option',
		completed: false,
		component: FoodSelectionStep,
	},
	{
		label: 'Enter email address',
		completed: false,
		component: EmailAddressStep,
	},
	{
		label: 'Display links and what was confirmed',
		completed: false,
		component: SummaryStep,
	},
];

export default function Stepper() {
	const activeStep = useActiveStep();
	const setNextStep = useSetNextStep();
	const setPreviousStep = useSetPreviousStep();

	return (
		<div
			style={{
				width: '500px',
			}}
		>
			<ActiveStep step={steps[activeStep]} />
			<MobileStepper
				variant="progress"
				steps={steps.length}
				position="static"
				activeStep={activeStep}
				sx={{ width: 800, maxWidth: 500, flexGrow: 1 }}
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
		</div>
	);
}
