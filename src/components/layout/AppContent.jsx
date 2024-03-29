import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfoilioChart from '../PortfoilioChart';
import AssetsTable from '../AssetsTable';
import { useState, useEffect } from 'react';
import CardList from '../Card';
const contentStyle = {
	textAlign: 'center',
	display: 'flex',
	flexDirection: "column",
	minHeight: 'calc(100vh - 120px)',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem',
	overflowX: 'hidden'
};


export default function AppContent(params) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const { assets, crypto } = useCrypto();
	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title
				level={3}
				style={{ textAlign: 'left', color: '#fff', }}>
				Portfolio:{' '}
				{assets
					.map((asset) => {
						const coin = crypto.find((c) => c.id === asset.id);
						return asset.amount * coin.price;
					})
					.reduce((acc, v) => (acc += v), 0).toFixed(2)} $
			</Typography.Title>
			<PortfoilioChart />
			{windowWidth >= 800 ? <AssetsTable /> : <CardList assets={assets}/>}
			
		</Layout.Content>
	);
}
