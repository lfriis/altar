import React, { useState } from 'react';
import axios from 'axios';
import { MobileStepper, Button, Paper, CircularProgress } from '@mui/material';
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
	useSetRSVPStatus,
} from '../../store';
import styles from './Stepper.module.css';

export default function Stepper() {
	const guests = useGuests();
	const guestInfo = useGuestInfo();
	const setRSVPStatus = useSetRSVPStatus();
	const [loading, setLoading] = useState(false);

	const activeStep = useActiveStep();
	const setNextStep = useSetNextStep();
	const setPreviousStep = useSetPreviousStep();

	const skipRSVP = guests.every(
		(guest) => guest.name !== 'plus 1' && guest.confirmed === false
	);

	const skipSongRequest =
		activeStep === 2 && guestInfo?.songRequests.length === 0;

	const disableStepZero =
		activeStep === 0 &&
		guests.some(
			(guest) => guest.name !== 'plus 1' && guest.confirmed === null
		);

	const disableStepOne =
		activeStep === 1 &&
		guests.some(
			(guest) =>
				guest.name !== 'plus 1' &&
				guest.confirmed === true &&
				guest.foodOption.main === null
		);

	const disableNext = disableStepZero || disableStepOne;

	const handleSubmitRSVP = async () => {
		setLoading(true);
		axios
			.post('/api/guests/rsvp', { guests, guestInfo })
			.then(() => {
				setRSVPStatus('Success');
			})
			.catch(() => {
				setRSVPStatus('Error');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Paper className={styles.wrapper}>
			<ActiveStep step={steps[activeStep]} />
			<MobileStepper
				variant="progress"
				steps={steps.length}
				position="bottom"
				activeStep={activeStep}
				nextButton={
					activeStep === 3 || skipRSVP ? (
						<Button onClick={handleSubmitRSVP} disabled={loading}>
							RSVP
							<div
								className="align-items"
								style={{
									marginLeft: '5px',
									marginRight: '5px',
								}}
							>
								{loading ? (
									<CircularProgress size={15} />
								) : (
									<Check />
								)}
							</div>
						</Button>
					) : (
						<Button
							onClick={() => {
								setNextStep(activeStep);
							}}
							disabled={loading || disableNext}
						>
							{skipSongRequest ? 'Skip' : 'Next'}
							<KeyboardArrowRight />
						</Button>
					)
				}
				backButton={
					<Button
						size="small"
						onClick={() => setPreviousStep(activeStep)}
						disabled={activeStep === 0 || loading}
					>
						<KeyboardArrowLeft />
						Back
					</Button>
				}
			/>
		</Paper>
	);
}
