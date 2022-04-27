import React from 'react';
import {
	FormControl,
	MenuItem,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import { Guest } from '../interfaces';
import { useSetUpdatedGuest } from '../store';
import DropdownAccordion from './Dropdown.Accordion';

interface Props {
	guest: Guest;
	options: string[];
}

export default function GuestConfirmFoodOption({ guest, options }: Props) {
	const setUpdatedGuest = useSetUpdatedGuest();

	return (
		<FormControl fullWidth>
			<TextField
				select
				label="Food Option"
				disabled={!guest.confirmed}
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

			{guest.confirmed && (
				<DropdownAccordion accordionTitle="Any allergies/dietary restrictions?">
					<FormControl fullWidth>
						<FormControlLabel
							control={
								<Checkbox
									checked={
										guest.foodOption.glutenFree
											? guest.foodOption.glutenFree
											: false
									}
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
									checked={
										guest.foodOption.vegan
											? guest.foodOption.vegan
											: false
									}
									disabled={
										guest.foodOption.main ===
										'Pork Tenderloin'
									}
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
							value={guest.foodOption.other}
							label="Other dietary restrictions"
							variant="standard"
							size="small"
							onChange={(e) => {
								const editedGuest = guest.clone();
								editedGuest.foodOption.other = e.target.value;
								setUpdatedGuest(editedGuest);
							}}
						/>
					</FormControl>
				</DropdownAccordion>
			)}
		</FormControl>
	);
}
