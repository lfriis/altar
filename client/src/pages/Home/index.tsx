import {
	Grid,
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
} from '@mui/material';
import React from 'react';

export default function Index() {
	return (
		<>
			<h2>Introduction home page</h2>
			<p>
				Create sample page displaying custom samples/linking to other
				couples sites with cards
			</p>

			<Grid container spacing={3}>
				<Grid item xs={6} md={4}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								Sample 1
							</Typography>
							<Typography variant="h5" component="div">
								Couple Name 1
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								Template name
							</Typography>
							<Typography variant="body2">
								Some body text
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">See Sample</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={6} md={4}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								Sample 2
							</Typography>
							<Typography variant="h5" component="div">
								Couple Name 2
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								Template name
							</Typography>
							<Typography variant="body2">
								Some body text
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">See Sample</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={6} md={4}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								Sample 3
							</Typography>
							<Typography variant="h5" component="div">
								Couple Name 3
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								Template name
							</Typography>
							<Typography variant="body2">
								Some body text
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">See Sample</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}
