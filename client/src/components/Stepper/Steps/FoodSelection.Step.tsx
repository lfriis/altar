import React, { useState } from 'react';
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
		<div>
			{guests &&
				guests.names.map((guest) => (
					<FoodOptionSelect
						key={guest}
						guestName={guest}
						handleSetConfirmedGuest={handleSetConfirmedGuest}
						options={config.foodOptions}
					/>
				))}
		</div>
	);
}
