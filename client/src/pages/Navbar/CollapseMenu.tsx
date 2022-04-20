import React, { useState, BaseSyntheticEvent } from 'react';
import { IconButton, MenuItem, Fade, Menu } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() => ({
	menu: {
		'& .MuiPaper-root': {
			minWidth: '160px',
			boxShadow: 'none',
		},
	},
	hr: {
		border: '1px solid #e5e5e5',
	},
	menuHeading: {
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

	return (
		<div style={{ marginLeft: 'auto' }}>
			<IconButton onClick={handleClick}>
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
					onClick={() => navigate('/')}
					divider
				>
					Wedding
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => navigate('/location')}
					divider
				>
					Location
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => navigate('/gifts')}
					divider
				>
					Gifts
				</MenuItem>
				<MenuItem
					className={styles.menuHeading}
					onClick={() => navigate('/rsvp')}
					divider
				>
					RSVP
				</MenuItem>
			</Menu>
		</div>
	);
}
