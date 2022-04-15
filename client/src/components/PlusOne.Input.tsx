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
		<div>
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
							plusOne.name = name;
							plusOne.edit = false;

							updateGuest(plusOne);
						}}
					/>
					<ConfirmToggle guest={guest} />
				</>
			)}
		</div>
	);
}
