import React from 'react';
import { Button } from '@mui/material';
import { Check, Error } from '@mui/icons-material';
import {
	PromptMessage,
	GuestAddressSearch,
	NavButtons,
	Stepper,
} from '../../components';
import {
	useGuestInfo,
	useGuestsFoodSelectionsExist,
	useRSVPStatus,
	useSetRSVPStatus,
} from '../../store';

export default function CouplesForm() {
	const guestInfo = useGuestInfo();
	const guestsFoodSelectionsExist = useGuestsFoodSelectionsExist();
	const rsvpStatus = useRSVPStatus();
	const setRSVPStatus = useSetRSVPStatus();

	return (
		<section className="rsvp">
			<div className="rsvp_form">
				{guestInfo && guestsFoodSelectionsExist ? (
					<PromptMessage>
						<h3>You have already submitted your RSVP!</h3>
						<p style={{ textAlign: 'center' }}>
							If you want to make any changes, please reach out to
							Jillian or Larsen.
						</p>
						<NavButtons />
					</PromptMessage>
				) : rsvpStatus === 'Success' ? (
					<PromptMessage>
						<h3 className="align-items-center">
							<Check style={{ paddingRight: '10px' }} />
							Your RSVP has been submitted!
						</h3>
						<p style={{ textAlign: 'center' }}>
							For more information about the special day, feel
							free to browse around.
						</p>
						<NavButtons />
					</PromptMessage>
				) : rsvpStatus === 'Error' ? (
					<PromptMessage>
						<Error color="primary" />
						<h3 style={{ textAlign: 'center' }}>
							Uh oh, something happened while submitting your
							RSVP.
						</h3>
						<p style={{ textAlign: 'center' }}>
							If this issue persist, please reach out to Jillian
							or Larsen.
						</p>
						<Button onClick={() => setRSVPStatus(null)}>
							Try Again
						</Button>
					</PromptMessage>
				) : guestInfo ? (
					<Stepper />
				) : (
					<GuestAddressSearch />
				)}
			</div>
		</section>
	);
}
