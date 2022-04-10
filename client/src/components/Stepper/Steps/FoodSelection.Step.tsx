import React from 'react';
import { useGuests } from '../../../store';
import { FoodOptionSelect } from '../..';
import config from '../../../pages/Couples/Friises';

export default function FoodSelectionStep() {
	const guests = useGuests();

	return (
		<div>
			{guests &&
				guests.map((guest) => (
					<div key={guest.name}>
						<h4>{guest.name}</h4>

						<FoodOptionSelect
							guest={guest}
							options={config.foodOptions}
						/>
					</div>
				))}
		</div>
	);
}
