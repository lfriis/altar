import React from 'react';
import { makeStyles } from '@mui/styles';
import { AlertMessage, GuestAddressSearch, Stepper } from '../../components';
import {
	useGuestInfo,
	useGuestsFoodSelectionsExist,
	useRSVPStatus,
} from '../../store';

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
	const guestsFoodSelectionsExist = useGuestsFoodSelectionsExist();
	const rsvpStatus = useRSVPStatus();

	return (
		<form className={styles.form}>
			{guestInfo && guestsFoodSelectionsExist ? (
				<AlertMessage status="Warning">
					<div>
						We already have your info saved. If you want to make any
						changes please reach out to Jillian or Larsen.
					</div>
				</AlertMessage>
			) : rsvpStatus === 'Success' ? (
				<AlertMessage status="Success">
					<div>
						Woohoo! RSVP has been saved.We are exiting to see you
						there
					</div>
				</AlertMessage>
			) : guestInfo ? (
				<Stepper />
			) : (
				<GuestAddressSearch />
			)}
		</form>
	);
}
