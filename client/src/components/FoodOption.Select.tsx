import React, { useState, useEffect } from 'react';
import {
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	SelectChangeEvent,
} from '@mui/material';
// import { Check, Clear } from '@mui/icons-material';
import { IConfirmedGuest } from '../pages/Couples';

interface Props {
	guestName: string;
	handleSetConfirmedGuest: (arg0: IConfirmedGuest) => void;
	options: string[];
}

export default function GuestConfirmFoodOption({
	guestName,
	handleSetConfirmedGuest,
	options,
}: Props) {
	const [foodSelection, setFoodSelection] = useState<string | null>(null);

	useEffect(() => {
		if (!foodSelection) return;
		handleSetConfirmedGuest({ guestName, foodSelection });
	}, [foodSelection]);

	return (
		<FormControl>
			<InputLabel>Food Option</InputLabel>

			<Select
				variant="outlined"
				onChange={(e: SelectChangeEvent) => {
					setFoodSelection(e.target.value);
				}}
			>
				{options.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
