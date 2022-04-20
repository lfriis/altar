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
		<div className="center_element">
			{guestInfo && guestsFoodSelectionsExist ? (
				<PromptMessage status="Warning">
					<div>
						<h3 className="align-items-center">
							<Check style={{ paddingRight: '10px' }} />
							You have already submitted your RSVP!
						</h3>
						If you want to make any changes, please reach out to
						Jillian or Larsen.
					</div>
					<NavButtons />
				</PromptMessage>
			) : rsvpStatus === 'Success' ? (
				<PromptMessage status="Success">
					<h3 className="align-items-center">
						<Check style={{ paddingRight: '10px' }} />
						Your RSVP has been saved!
					</h3>
					<p>
						For more information about the wedding, feel free to
						browser to the following pages:
					</p>
					<NavButtons />
				</PromptMessage>
			) : guestInfo ? (
				<Stepper />
			) : (
				<GuestAddressSearch />
			)}
		</div>
	);
}
