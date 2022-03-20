import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styles from '../Stepper.module.css';
import { useGuestInfo, useSetUpdatedGuestInfo } from '../../../store';

export default function EmailAddressStep() {
	const guestInfo = useGuestInfo();
	const updateGuestInfo = useSetUpdatedGuestInfo();
	const [emailValidated, setEmailValidated] = useState(true);

	const validateEmail = (_email: string, setError: boolean) => {
		const emailPattern =
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

		if (!emailPattern.test(_email) && setError) {
			setEmailValidated(false);
		} else {
			setEmailValidated(true);
		}
	};

	return (
		<div className={styles.step_container}>
			<TextField
				style={{ margin: '0' }}
				type="email"
				label="Email Address"
				variant="outlined"
				value={guestInfo?.email ? guestInfo?.email : ''}
				fullWidth
				onChange={(e) => {
					if (guestInfo) {
						const editedGuestInfo = guestInfo.clone();
						editedGuestInfo.email = e.target.value;
						updateGuestInfo(editedGuestInfo);
						validateEmail(e.target.value, false);
					}
				}}
				onBlur={(e) => {
					if (e.target.value.length > 0) {
						validateEmail(e.target.value, true);
					}
				}}
				autoFocus
				error={!emailValidated}
				helperText={
					!emailValidated && 'Please enter a valid email address.'
				}
			/>
		</div>
	);
}
