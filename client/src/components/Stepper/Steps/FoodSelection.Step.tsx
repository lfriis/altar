import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { useGuests } from '../../../store';
import { ConfirmedGuest } from '../../../interfaces';
import { FoodOptionSelect } from '../..';
import config from '../../../pages/Couples/Friises';

export default function FoodSelectionStep() {
	const guests = useGuests();
	const [confirmedGuests, setConfirmedGuests] = useState<ConfirmedGuest[]>(
		[]
	);

	const handleSetConfirmedGuest = (
		confirmedGuestSelection: ConfirmedGuest
	) => {
		const filteredDuplicates = confirmedGuests.filter(
			(guest) => guest.guestName !== confirmedGuestSelection.guestName
		);
		setConfirmedGuests([...filteredDuplicates, confirmedGuestSelection]);
	};

	return (
		<Paper>
			<h4>Select a food option per guest</h4>
			{guests &&
				guests.names.map((guest) => (
					<FoodOptionSelect
						key={guest}
						guestName={guest}
						handleSetConfirmedGuest={handleSetConfirmedGuest}
						options={config.foodOptions}
					/>
				))}
		</Paper>
	);
}
