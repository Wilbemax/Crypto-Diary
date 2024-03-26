import { Layout } from 'antd';
import AppHeader from './/appHeader';
import AppFooret from './AppFooter';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoConext from '../../context/crypto-context';
import {Spin } from 'antd'

export default function AppLayout() {
    const {loading} = useContext(CryptoConext)

    if (loading) {
		return <Spin fullscreen />;
	}
	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
			<AppFooret />
		</Layout>
	);
}
