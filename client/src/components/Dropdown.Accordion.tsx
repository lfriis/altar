import React, { ReactNode } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface Props {
	accordionTitle: string;
	children: ReactNode;
}

export default function DropdownAccordion({ accordionTitle, children }: Props) {
	return (
		<Accordion className="accordion-borderless" variant="outlined">
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography>{accordionTitle}</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
}
