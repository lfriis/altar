import React, { useState, useEffect } from 'react';
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	IconButton,
} from '@mui/material';
import { Check } from '@mui/icons-material';

interface IProps {
	name: string;
}

export default function GuestsComp({ name }: IProps) {
	const [selection, setSelection] =
		useState<Nullable<string | unknown>>(null);
	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		console.log(`${name} ${selection}`);
	}, [confirmed]);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<FormControl>
				<TextField variant="outlined" value={name} disabled />
			</FormControl>
			<FormControl>
				<InputLabel id="guest-food-option">Food Option</InputLabel>

				<Select
					labelId="guest-food-option"
					onChange={(e) => setSelection(e.target.value)}
				>
					<MenuItem value="Pork">Pork Tenderloin</MenuItem>
					<MenuItem value="Vegetarian">Vegetarian</MenuItem>
					<MenuItem value="Vegan">Vegan</MenuItem>
				</Select>
			</FormControl>
			<IconButton
				disabled={selection === null}
				onClick={() => setConfirmed(true)}
			>
				<Check />
			</IconButton>
		</div>
	);
}
