/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
	FormControl,
	FormHelperText,
	Input,
	InputBaseProps,
	InputLabel,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
	error: {
		color: '#f44336 !important',
	},
}));

interface IProps extends InputBaseProps {
	label: string;
	value: string | null;
	helperText?: string;
	displayHelper?: boolean;
}

export default function PasswordToggleInput({
	label,
	helperText = '',
	displayHelper = false,
	...rest
}: IProps) {
	const styles = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [showAdornment, setShowAdornment] = useState(false);

	return (
		<FormControl variant="standard">
			<InputLabel
				color="secondary"
				htmlFor={`input-field-${label}`}
				error={displayHelper}
			>
				{label}
			</InputLabel>
			<Input
				color="secondary"
				id={`input-field-${label}`}
				autoComplete={label}
				type={showPassword ? 'text' : 'password'}
				onMouseEnter={() => setShowAdornment(true)}
				onMouseLeave={() => setShowAdornment(false)}
				error={displayHelper}
				endAdornment={
					showAdornment && (
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					)
				}
				{...rest}
			/>
			{displayHelper && (
				<FormHelperText
					id={`input-field-${label}`}
					className={styles.error}
				>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
}
