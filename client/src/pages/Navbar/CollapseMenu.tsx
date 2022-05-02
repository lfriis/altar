import React, { useState, BaseSyntheticEvent } from 'react';
import { IconButton, MenuItem, Fade, Menu } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() => ({
	menu: {
		opacity: '87%',
		'& .MuiPaper-root': {
			minWidth: '160px',
			boxShadow: 'none',
		},
		'& .MuiMenu-list': {
			paddingTop: '0px',
			paddingBottom: '0px',
		},
	},
	hr: {
		border: '1px solid #e5e5e5',
	},
	menuHeading: {
		backgroundColor: 'white !important',
		textTransform: 'uppercase',
		fontSize: '12px',
		lineHeight: '1.45455',
	},
	menuItem: {
		cursor: 'pointer',
		fontSize: '14px',
		color: 'black !important',
		pointerEvents: 'none',
	},
	menuIconOverride: {
		margin: 0,
		padding: 0,
	},
	menuIcon: {
		color: 'white',
	},
}));

export default function CollapseMenu() {
	const styles = useStyles();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: BaseSyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleNavigation = (path: string) => {
		setAnchorEl(null);
		navigate(path);
	};

	return (
		<div style={{ marginLeft: 'auto' }}>
			<IconButton
				className={styles.menuIconOverride}
				onClick={handleClick}
			>
				<MenuIcon className={styles.menuIcon} fontSize="medium" />
			</IconButton>
			<Menu
				id="fade-menu"
				className={styles.menu}
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => {
						handleNavigation('/');
					}}
					divider
				>
					Wedding
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => {
						handleNavigation('/location');
					}}
					divider
				>
					Location
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => {
						handleNavigation('/gifts');
					}}
					divider
				>
					Gifts
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => {
						handleNavigation('/rsvp');
					}}
				>
					RSVP
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => {
						handleNavigation('/gallery');
					}}
					divider
				>
					Gallery
				</MenuItem>
			</Menu>
		</div>
	);
}
