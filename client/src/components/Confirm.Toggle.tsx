import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { CancelOutlined, Cancel } from '@mui/icons-material';
import { Guest } from '../interfaces';
import { useSetUpdatedGuest } from '../store';

export default function ConfirmToggle({ guest }: { guest: Guest }) {
	const setUpdatedGuest = useSetUpdatedGuest();

	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Checkbox
						checked={guest.confirmed === true}
						style={{ margin: '0' }}
						onClick={() => {
							const editedGuest = guest.clone();
							editedGuest.confirmed = true;
							setUpdatedGuest(editedGuest);
						}}
					/>
				}
				label="Joyfully Accept"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={guest.confirmed === false}
						icon={<CancelOutlined />}
						checkedIcon={<Cancel />}
						style={{ margin: '0' }}
						onClick={() => {
							const editedGuest = guest.clone();
							editedGuest.confirmed = false;
							editedGuest.foodOption = {
								main: null,
								vegan: null,
								glutenFree: null,
								other: null,
							};
							setUpdatedGuest(editedGuest);
						}}
					/>
				}
				label="Regretfully Decline"
			/>
		</FormGroup>
	);
}
