import React from 'react';
import { useGuests } from '../../../store';
import ConfirmToggle from '../../Confirm.Toggle';
import styles from '../Stepper.module.css';

export default function ConfirmationStep() {
	const guests = useGuests();
	// const [confirmedGuests, setConfirmedGuests] = useState<ConfirmedGuest[]>(
	// 	[]
	// );

	// const handleSetConfirmedGuest = (
	// 	confirmedGuestSelection: ConfirmedGuest
	// ) => {
	// 	const filteredDuplicates = confirmedGuests.filter(
	// 		(guest) => guest.guestName !== confirmedGuestSelection.guestName
	// 	);
	// 	setConfirmedGuests([...filteredDuplicates, confirmedGuestSelection]);
	// };

	return (
		<div>
			{guests &&
				guests.names.map((guest) => (
					<div className={styles.step_container}>
						<h4 className={styles.guest_name}>{guest}</h4>

						<ConfirmToggle key={guest} />
					</div>
				))}
		</div>
	);
}
