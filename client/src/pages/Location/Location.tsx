import React from 'react';
import { WeddingTimeline } from '../../components';

export default function Location() {
	return (
		<>
			<section className="location">
				<div className="landing-wrapper-content">
					<p className="landing-wrapper-header">Location</p>
					<p className="landing-wrapper-subheading">
						Sprucewood Shores Estate Winery, Amherstburg ON
					</p>
				</div>
			</section>
			<section>
				<p className="landing-wrapper-header" style={{ margin: '0' }}>
					Directions
				</p>
				<p className="landing-wrapper-body">
					Sprucewood Shores Estate Winery is a short trip away from
					Kingsville. Follow the instructions below to get there.
				</p>
				<WeddingTimeline />
			</section>
		</>
	);
}
