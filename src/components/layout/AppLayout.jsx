import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppFooret from './AppFooter';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoConext from '../../context/crypto-context';
import { Spin } from 'antd';
import NotFound from './NotFound';
import { useState, useEffect } from 'react';

export default function AppLayout() {
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
	const { loading, assets } = useContext(CryptoConext);

	if (loading) {
		return <Spin fullscreen />;
	}
	return (
		<Layout>
			<AppHeader />

			{assets.length === 0 ? (
				<Layout>
					<NotFound />
				</Layout>
			) : windowWidth > 800 ? (
				<Layout>
					<AppSider />
					<AppContent />
				</Layout>
			) : (
				<Layout>
					<AppContent />
				</Layout>
			)}

			<AppFooret />
		</Layout>
	);
}
