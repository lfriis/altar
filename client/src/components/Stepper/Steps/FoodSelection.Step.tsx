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
						{guest.name !== 'plus 1' ? (
							<>
								<h4>{guest.name}</h4>
								<FoodOptionSelect
									guest={guest}
									options={config.foodOptions}
								/>
							</>
						) : (
							<div>
								<br />
								<br />
								<br />
								<br />
								Don&apos;t forget your guest! Go back and input
								their information!
							</div>
						)}
					</div>
				))}
		</div>
	);
}
