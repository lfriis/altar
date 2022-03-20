import React, { useState } from 'react';
import { useGuests } from '../../../store';
import { ConfirmedGuest } from '../../../interfaces';
import { FoodOptionSelect } from '../..';
import config from '../../../pages/Couples/Friises';
import styles from '../Stepper.module.css';

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
				guests.map((guest) => (
					<div className={styles.step_container} key={guest.name}>
						<h4 className={styles.guest_label}>{guest.name}</h4>

						<FoodOptionSelect
							guestName={guest.name}
							handleSetConfirmedGuest={handleSetConfirmedGuest}
							options={config.foodOptions}
						/>
					</div>
				))}
		</div>
	);
}
