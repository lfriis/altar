import React from 'react';
import { MobileStepper, Button, Paper } from '@mui/material';
import {
	KeyboardArrowLeft,
	KeyboardArrowRight,
	Check,
} from '@mui/icons-material';
import ActiveStep from './StepperBody';
import steps from './StepIndex';
import {
	useActiveStep,
	useSetNextStep,
	useSetPreviousStep,
	useGuests,
	useGuestInfo,
} from '../../store';
import styles from './Stepper.module.css';

export default function Stepper() {
	const guests = useGuests();
	const guestInfo = useGuestInfo();

	const activeStep = useActiveStep();
	const setNextStep = useSetNextStep();
	const setPreviousStep = useSetPreviousStep();

	// const handleSubmitRSVP = async () => {
	// 	setLoading(true);
	// 	axios
	// 		.post('/api/guests/option', confirmedGuests)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setGuests(res.data.guestInfo);
	// 			setLoading(false);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 			setLoading(false);
	// 		});
	// };

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
						<Button onClick={() => console.log(guests, guestInfo)}>
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
