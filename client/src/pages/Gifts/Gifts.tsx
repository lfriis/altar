import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { GoogleSheetGuestInfo } from '../../interfaces';

export default function Gifts() {
	const [guests, setGuests] = useState<GoogleSheetGuestInfo[]>([]);

	const fetchUserData = () => {
		axios
			.get('/api/qr-code')
			.then((res) => {
				console.log(res);
				setGuests(res.data.updatedGuestInfo);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchUserData();
		console.log(guests);
	}, []);

	return (
		<div>
			<div className="home-page">
				<div className="home-page-content">
					<p style={{ fontSize: '50px', letterSpacing: '0.1em' }}>
						Gifts
					</p>
					<p style={{ fontSize: '20px', letterSpacing: '0.1em' }}>
						Contribute to our Honeymoon or relocation to Austalia
					</p>
				</div>
			</div>

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
							<h2
								style={{
									paddingBottom: '50px',
								}}
							>
								{guest.envelope}
							</h2>

							<QRCodeSVG
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
						</div>
					))}
			</div>
		</div>
	);
}
