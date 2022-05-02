import React from 'react';
import { useGuests } from '../../../store';
import { FoodOptionSelect } from '../..';
import rsvpConfig from '../../../pages/RSVP/Friises';

export default function FoodSelectionStep() {
	const guests = useGuests();

	return (
		<div>
			{guests &&
				guests.map((guest) => (
					<div key={guest.name}>
						{guest.name !== 'plus 1' ? (
							<>
								<h3 style={{ fontFamily: 'Alegreya Sans' }}>
									{guest.name}
								</h3>
								<FoodOptionSelect
									guest={guest}
									options={rsvpConfig.foodOptions}
								/>
							</>
						) : (
							<div className="justify-content">
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
