import React from 'react';
import { useGuests } from '../../../store';
import { FoodOptionSelect } from '../..';
import config from '../../../pages/Couples/Friises';
import styles from '../Stepper.module.css';

export default function FoodSelectionStep() {
	const guests = useGuests();

	return (
		<div>
			{guests &&
				guests.map((guest) => (
					<div className={styles.step_container} key={guest.name}>
						<h4 className={styles.guest_label}>{guest.name}</h4>

						<FoodOptionSelect
							guest={guest}
							options={config.foodOptions}
						/>
					</div>
				))}
		</div>
	);
}
