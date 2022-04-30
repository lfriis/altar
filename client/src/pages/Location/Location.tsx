import React from 'react';
import { WeddingLocation, WeddingTimeline } from '../../components';

export default function Location() {
	return (
		<>
			<section className="location">
				<div className="landing-wrapper-content">
					<p className="landing-wrapper-header">Location</p>
					<p className="landing-wrapper-subheading">
						Sprucewood Shores Estate Winery - Amherstburg, ON
					</p>
				</div>
			</section>
			<section>
				<p
					className="landing-wrapper-header"
					style={{ marginBottom: '0' }}
				>
					Our Day
				</p>
				<p
					className="landing-wrapper-body"
					style={{ textAlign: 'center' }}
				>
					Eat, drink, dance, repeat.
				</p>
				<WeddingTimeline />
				<hr />
				<p
					className="landing-wrapper-header"
					style={{ marginBottom: '0' }}
				>
					Directions
				</p>
				<p
					className="landing-wrapper-body"
					style={{ textAlign: 'center' }}
				>
					Sprucewood Shores Estate Winery is a short trip away from
					Kingsville. Follow the instructions below to get there.
				</p>
				<WeddingLocation />
			</section>
		</>
	);
}
