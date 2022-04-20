import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ConfirmToggle from './Confirm.Toggle';
import { Guest } from '../interfaces';
import { useSetUpdatedGuest } from '../store';

interface Props {
	guest: Guest;
}

export default function PlusOne({ guest }: Props) {
	const updateGuest = useSetUpdatedGuest();
	const [activated, setActivated] = useState(guest.edit);
	const [name, setName] = useState(guest.edit ? guest.name : '');

	return (
		<div style={{ padding: '20px 0px 20px 0px' }}>
			{!activated ? (
				<Button variant="contained" onClick={() => setActivated(true)}>
					Plus 1
				</Button>
			) : (
				<>
					<TextField
						value={name}
						label="Add Guest Name"
						variant="standard"
						onChange={(e) => {
							setName(e.target.value);
						}}
						onBlur={() => {
							const plusOne = guest.clone();
							// Reset plus one to default
							if (name === '') {
								plusOne.name = 'plus 1';
								plusOne.edit = false;
								plusOne.confirmed = null;
								plusOne.foodOption = {
									main: null,
									glutenFree: null,
									vegan: null,
									other: null,
								};
							} else {
								plusOne.name = name;
								plusOne.edit = false;
							}
							updateGuest(plusOne);
						}}
						fullWidth
					/>
					<ConfirmToggle guest={guest} />
				</>
			)}
		</div>
	);
}
