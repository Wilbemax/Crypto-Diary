import { Layout,  Spin,  } from 'antd';

import { useContext } from 'react';
import CryptoConext from '../../context/crypto-context';
import CardList from '../Card';

const siderStyle = {
	padding: '1rem',
	minWidth: 265,
};

export default function AppSider() {
	const { loading, assets, deletAsset } = useContext(CryptoConext);

	if (loading) {
		return <Spin fullscreen />;
	}

	return (
		<Layout.Sider
			width="400"
			style={siderStyle}>
			<CardList assets={assets}/>
			
		</Layout.Sider>
	);
}
