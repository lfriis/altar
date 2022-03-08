import React, { useState, useEffect } from 'react';
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	SelectChangeEvent,
} from '@mui/material';
// import { Check, Clear } from '@mui/icons-material';
import { IConfirmedGuest } from '../pages/Couples';

interface IProps {
	guestName: string;
	handleSetConfirmedGuest: (arg0: IConfirmedGuest) => void;
	options: string[];
}

export default function GuestConfirmFoodOption({
	guestName,
	handleSetConfirmedGuest,
	options,
}: IProps) {
	const [foodSelection, setFoodSelection] = useState<string | null>(null);

	useEffect(() => {
		if (!foodSelection) return;
		handleSetConfirmedGuest({ guestName, foodSelection });
	}, [foodSelection]);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<FormControl>
				<TextField variant="outlined" value={guestName} disabled />
			</FormControl>
			<FormControl>
				<InputLabel id="guest-food-option">Food Option</InputLabel>

				<Select
					labelId="guest-food-option"
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
			{/* <IconButton
				disabled={selection === null}
				onClick={() => setConfirmedSelection(!confirmedSelection)}
			>
				{confirmedSelection ? <Clear /> : <Check />}
			</IconButton> */}
		</div>
	);
}
