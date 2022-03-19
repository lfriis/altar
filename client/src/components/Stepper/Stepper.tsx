/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MobileStepper, Button, Paper } from '@mui/material';
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
	SongRequestStep,
	SummaryStep,
} from './Steps';
import { Step } from '../../interfaces';
import { useActiveStep, useSetNextStep, useSetPreviousStep } from '../../store';
import styles from './Stepper.module.css';

const steps: Step[] = [
	{
		label: 'We hope to see you there',
		completed: false,
		component: ConfirmationStep,
	},
	{
		label: "What's on the menu?",
		completed: false,
		component: FoodSelectionStep,
	},
	{
		label: "We won't bug you too much",
		completed: false,
		component: EmailAddressStep,
	},
	{
		label: 'Give us a beat',
		completed: false,
		component: SongRequestStep,
	},
	{
		label: "Can't wait to see you",
		completed: false,
		component: SummaryStep,
	},
];

export default function Stepper() {
	const activeStep = useActiveStep();
	const setNextStep = useSetNextStep();
	const setPreviousStep = useSetPreviousStep();

	return (
		<Paper className={styles.wrapper}>
			<ActiveStep step={steps[activeStep]} />
			<MobileStepper
				variant="progress"
				steps={steps.length}
				position="static"
				activeStep={activeStep}
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
		</Paper>
	);
}
