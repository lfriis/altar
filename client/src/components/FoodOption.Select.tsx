import React, { useState, useEffect } from 'react';
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	IconButton,
} from '@mui/material';
import { Check, Clear } from '@mui/icons-material';
import { IConfirmedGuest } from '../pages/Couples/couples.declarations';

interface IProps {
	guest: string;
	handleSetGuest: (arg0: IConfirmedGuest) => void;
	options: string[];
}

export default function GuestConfirmFoodOption({
	guest,
	handleSetGuest,
	options,
}: IProps) {
	const [selection, setSelection] =
		useState<Nullable<string | unknown>>(null);
	const [confirmedSelection, setConfirmedSelection] = useState(false);

	useEffect(() => {
		handleSetGuest({ guest, selection });
	}, [confirmedSelection]);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<FormControl>
				<TextField variant="outlined" value={guest} disabled />
			</FormControl>
			<FormControl>
				<InputLabel id="guest-food-option">Food Option</InputLabel>

				<Select
					labelId="guest-food-option"
					onChange={(e) => {
						setSelection(e.target.value);
						setConfirmedSelection(false);
					}}
				>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<IconButton
				disabled={selection === null}
				onClick={() => setConfirmedSelection(!confirmedSelection)}
			>
				{confirmedSelection ? <Clear /> : <Check />}
			</IconButton>
		</div>
	);
}
