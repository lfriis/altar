import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { openInNewTab } from '../utils';

export default function WeddingLocation() {
	const removeIcon = useMediaQuery('(max-width:375px)');
	const smallButton = useMediaQuery('(max-width:575px)');

	return (
		<>
			<Button
				size={smallButton ? 'small' : 'large'}
				style={{
					fontSize: '0.7rem',
					margin: '25px 0px',
				}}
				startIcon={!removeIcon && <LocationOn />}
				onClick={() => {
					openInNewTab('https://g.page/SprucewoodShores?share');
				}}
			>
				7258 Essex County Rd 50 RR #5, Amherstburg, ON N0R 1G0
			</Button>
			<br />
			{/* <iframe
				className="iframed-map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5927.922778611242!2d-83.00837729478698!3d42.02256068720856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x95a618a02009f5f9!2zNDLCsDAxJzIwLjQiTiA4M8KwMDAnMjAuNyJX!5e0!3m2!1sen!2sca!4v1651344540677!5m2!1sen!2sca"
				width="300"
				height="200"
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title="Sprucewood Shores Estate Winery"
			/> */}
		</>
	);
}
