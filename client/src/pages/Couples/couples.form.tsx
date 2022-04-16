import React from 'react';
import { makeStyles } from '@mui/styles';
import { GuestAddressSearch, Stepper } from '../../components';
import { useGuestInfo } from '../../store';

const useStyles = makeStyles(() => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '45px',

		'& .MuiFormControl-root': {
			margin: '10px',
			width: '400px',
		},
		'& .MuiButtonBase-root': {
			margin: '20px',
		},
		'& .MuiButton-contained': {
			width: '400px',
		},
	},
	avatar: {
		width: '70px !important',
		height: '70px !important',
	},
	title: {
		paddingTop: '30px',
		paddingBottom: '30px',
		fontSize: '18px !important',
		textTransform: 'uppercase',
		letterSpacing: '0.1em !important',
	},
	credentials: {
		paddingTop: '8px',
	},
}));

export default function CouplesForm() {
	const styles = useStyles();
	const guestInfo = useGuestInfo();

	return (
		<form className={styles.form}>
			{guestInfo ? <Stepper /> : <GuestAddressSearch />}
		</form>
	);
}
