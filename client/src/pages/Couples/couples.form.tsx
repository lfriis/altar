import React from 'react';
import { Check } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {
	AlertMessage,
	GuestAddressSearch,
	NavButtons,
	Stepper,
} from '../../components';
import {
	useGuestInfo,
	useGuestsFoodSelectionsExist,
	useRSVPStatus,
} from '../../store';

const useStyles = makeStyles(() => ({
	wrapper: {
		minWidth: '300px',
	},
	buttonWrapper: {
		paddingTop: '30px',
	},
	button: {
		margin: '0 10px',
	},
}));

export default function CouplesForm() {
	const styles = useStyles();
	const guestInfo = useGuestInfo();
	const guestsFoodSelectionsExist = useGuestsFoodSelectionsExist();
	const rsvpStatus = useRSVPStatus();

	return (
		<div className={`center_element ${styles.wrapper}`}>
			{guestInfo && guestsFoodSelectionsExist ? (
				<AlertMessage status="Warning">
					<div>
						<h3 className="align-items-center">
							<Check style={{ paddingRight: '10px' }} />
							You have already submitted your RSVP!
						</h3>
						If you want to make any changes, please reach out to
						Jillian or Larsen.
					</div>
					<NavButtons />
				</AlertMessage>
			) : rsvpStatus === 'Success' ? (
				<AlertMessage status="Success">
					<h3 className="align-items-center">
						<Check style={{ paddingRight: '10px' }} />
						Your RSVP has been saved!
					</h3>
					<p>
						For more information about the wedding, feel free to
						browser to the following pages:
					</p>
					<NavButtons />
				</AlertMessage>
			) : guestInfo ? (
				<Stepper />
			) : (
				<GuestAddressSearch />
			)}
		</div>
	);
}
