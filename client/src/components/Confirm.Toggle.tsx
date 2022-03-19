import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { CancelOutlined, Cancel } from '@mui/icons-material';

export default function ConfirmToggle() {
	const [confirmedGuest, setConfirmedGuest] = useState<boolean | null>(null);

	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Checkbox
						checked={confirmedGuest === true}
						style={{ margin: '0' }}
						onClick={() => {
							setConfirmedGuest(true);
						}}
					/>
				}
				label="Joyfully Accept"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={confirmedGuest === false}
						icon={<CancelOutlined />}
						checkedIcon={<Cancel />}
						style={{ margin: '0' }}
						onClick={() => {
							setConfirmedGuest(false);
						}}
					/>
				}
				label="Regretfully Decline"
			/>
		</FormGroup>
	);
}
