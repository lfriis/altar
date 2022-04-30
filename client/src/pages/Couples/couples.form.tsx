import React from 'react';
import { Check } from '@mui/icons-material';
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
} from '../../store';

export default function CouplesForm() {
	const guestInfo = useGuestInfo();
	const guestsFoodSelectionsExist = useGuestsFoodSelectionsExist();
	const rsvpStatus = useRSVPStatus();

	return (
		<section className="rsvp">
			<div className="rsvp_form">
				{guestInfo && guestsFoodSelectionsExist ? (
					<PromptMessage status="Warning">
						<h3>You have already submitted your RSVP!</h3>
						<p style={{ textAlign: 'center' }}>
							If you want to make any changes, please reach out to
							Jillian or Larsen.
						</p>
						<NavButtons />
					</PromptMessage>
				) : rsvpStatus === 'Success' ? (
					<PromptMessage status="Success">
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
				) : guestInfo ? (
					<Stepper />
				) : (
					<GuestAddressSearch />
				)}
			</div>
		</section>
	);
}
