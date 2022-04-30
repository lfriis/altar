import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { GoogleSheetGuestInfo } from '../interfaces';

export default function QRCodeGeneration() {
	const [guests, setGuests] = useState<GoogleSheetGuestInfo[]>([]);

	const fetchUserData = () => {
		axios.get('/api/qr-code').then((res) => {
			setGuests(res.data.updatedGuestInfo);
		});
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<section className="gifts">
			<p className="landing-wrapper-subheading">QR Codes</p>

			<div style={{ paddingTop: '1000px', paddingLeft: '100px' }}>
				{guests.length > 0 &&
					guests.map((guest) => (
						<div
							key={guest.postal_code}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								padding: '50px',
							}}
						>
							<QRCodeCanvas
								value={guest.encrypted_address!}
								size={180}
								bgColor="#ffffff"
								fgColor="#000000"
								level="L"
								includeMargin={false}
								imageSettings={{
									src: 'https://i.ibb.co/k8sZgZP/marriage.png',
									height: 24,
									width: 24,
									excavate: true,
								}}
							/>

							<h3
								style={{
									paddingBottom: '50px',
								}}
							>
								{guest.envelope}
							</h3>
						</div>
					))}
			</div>
		</section>
	);
}
