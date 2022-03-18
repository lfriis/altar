import React, { useState, useEffect } from 'react';
import {
	FormGroup,
	FormControlLabel,
	Checkbox,
	IconButton,
} from '@mui/material';
import { Cancel, CancelOutlined, PlusOne } from '@mui/icons-material';
import { useGuests } from '../../../store';

export default function ConfirmationStep() {
	const guests = useGuests();
	const [confirmedGuest, setConfirmedGuest] = useState<boolean | null>(null);

	useEffect(() => {
		console.log('Confirmed: ', confirmedGuest);
	}, [confirmedGuest]);

	return (
		<div>
			{guests &&
				guests.names.map((guest) => (
					<>
						{guest === 'plus 1' ? (
							<IconButton>
								<PlusOne />
							</IconButton>
						) : (
							<h4>{guest}</h4>
						)}

						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={confirmedGuest === true}
										style={{ margin: '0' }}
										onClick={() => {
											setConfirmedGuest(true);
										}}
									/>
								}
								label="Joyfully Accept"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={confirmedGuest === false}
										icon={<CancelOutlined />}
										checkedIcon={<Cancel />}
										style={{ margin: '0' }}
										onClick={() => {
											setConfirmedGuest(false);
										}}
									/>
								}
								label="Regretfully Decline"
							/>
						</FormGroup>
					</>
				))}
		</div>
	);
}
