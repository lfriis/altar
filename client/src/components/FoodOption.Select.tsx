import React from 'react';
import {
	FormControl,
	MenuItem,
	TextField,
	Checkbox,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Guest } from '../interfaces';
import { useSetUpdatedGuest } from '../store';

interface Props {
	guest: Guest;
	options: string[];
}

export default function GuestConfirmFoodOption({ guest, options }: Props) {
	const setUpdatedGuest = useSetUpdatedGuest();

	return (
		<FormControl>
			<TextField
				select
				label="Food Option"
				value={guest.foodOption?.main ? guest.foodOption.main : ''}
				variant="outlined"
				onChange={(e) => {
					const editedGuest = guest.clone();
					editedGuest.foodOption.main = e.target.value;
					setUpdatedGuest(editedGuest);
				}}
			>
				{options.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField>

			<Accordion className="accordion-borderless" variant="outlined">
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Typography>Any dietary restrictions?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormControl>
						<FormControlLabel
							control={
								<Checkbox
									style={{ margin: '0' }}
									onChange={(e) => {
										const editedGuest = guest.clone();
										editedGuest.foodOption.glutenFree =
											e.target.checked;
										setUpdatedGuest(editedGuest);
									}}
								/>
							}
							label="Gluten Free"
						/>
						<FormControlLabel
							control={
								<Checkbox
									style={{ margin: '0' }}
									onChange={(e) => {
										const editedGuest = guest.clone();
										editedGuest.foodOption.vegan =
											e.target.checked;
										setUpdatedGuest(editedGuest);
									}}
								/>
							}
							label="Vegan"
						/>
						<TextField
							label="Other"
							variant="standard"
							size="small"
							onChange={(e) => {
								const editedGuest = guest.clone();
								editedGuest.foodOption.other = e.target.value;
								setUpdatedGuest(editedGuest);
							}}
						/>
					</FormControl>
				</AccordionDetails>
			</Accordion>
		</FormControl>
	);
}
