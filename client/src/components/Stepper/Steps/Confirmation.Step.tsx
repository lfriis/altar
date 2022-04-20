import React from 'react';
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useGuests, useSetUpdatedGuest } from '../../../store';
import ConfirmToggle from '../../Confirm.Toggle';
import PlusOneInput from '../../PlusOne.Input';

export default function ConfirmationStep() {
	const guests = useGuests();
	const updateGuest = useSetUpdatedGuest();

	return (
		<div>
			{guests &&
				guests.map((guest) =>
					guest.name === 'plus 1' || guest.edit ? (
						<PlusOneInput key={guest.name} guest={guest} />
					) : (
						<div key={guest.name}>
							<div className="align-items-center">
								<h1 style={{ fontFamily: 'Allura' }}>
									{guest.name}
								</h1>

								{guest.plusOne && guest.name !== 'plus 1' && (
									<IconButton
										onClick={() => {
											const editGuest = guest.clone();
											editGuest.edit = true;
											updateGuest(editGuest);
										}}
									>
										<Edit />
									</IconButton>
								)}
							</div>

							<ConfirmToggle guest={guest} />
						</div>
					)
				)}
		</div>
	);
}
