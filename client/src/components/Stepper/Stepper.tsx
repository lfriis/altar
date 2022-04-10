/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MobileStepper, Button, Paper } from '@mui/material';
import {
	KeyboardArrowLeft,
	KeyboardArrowRight,
	Check,
} from '@mui/icons-material';
import ActiveStep from './StepperBody';
import steps from './StepIndex';
import { useActiveStep, useSetNextStep, useSetPreviousStep } from '../../store';
import styles from './Stepper.module.css';

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
					activeStep === 4 ? (
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
