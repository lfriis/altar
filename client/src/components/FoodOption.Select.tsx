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
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<h4>{guestName}</h4>

			<FormControl>
				<InputLabel id="guest-food-option">Food Option</InputLabel>

				<Select
					style={{ maxWidth: '300px' }}
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
		</div>
	);
}
