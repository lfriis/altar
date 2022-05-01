import { makeStyles } from '@mui/styles';
import React from 'react';
import { Step } from '../../interfaces/Step';

const useStyles = makeStyles(() => ({
	stepTitle: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '30px',
	},
	stepLabel: {
		display: 'flex',
		textAlign: 'center',
		padding: '0px',
		margin: '0px',
	},
	stepComponent: {
		maxHeight: 'calc(80vh - 250px)',
		overflowY: 'auto',
		padding: '3px',
		margin: '3px',
	},
}));

export default function StepperBody({ step }: { step: Step }) {
	const styles = useStyles();
	const { label, component: StepComponent } = step;

	return (
		<div>
			<div className={styles.stepTitle}>
				<h1 style={{ fontWeight: '900' }}>RSVP</h1>
				<h3 className={styles.stepLabel}>{label}</h3>
			</div>
			<div className={styles.stepComponent}>
				<StepComponent />
			</div>
		</div>
	);
}
