import React, { useState } from 'react';
import { FormControl, TextField } from '@mui/material';

export default function EmailAddressStep() {
	const [email, setEmail] = useState('');
	const [emailValidated, setEmailValidated] = useState(false);

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
		<div>
			<FormControl>
				<TextField
					type="email"
					label="Email Address"
					variant="outlined"
					size="small"
					value={email}
					fullWidth
					onChange={(e) => {
						setEmail(e.target.value);
						validateEmail(e.target.value, false);
					}}
					onBlur={(e) => {
						if (e.target.value.length > 0) {
							validateEmail(e.target.value, true);
						}
					}}
					autoFocus
					helperText={
						!emailValidated && 'Please enter a valid email address.'
					}
					error={!emailValidated}
				/>
			</FormControl>
		</div>
	);
}
