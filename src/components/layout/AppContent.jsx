import { Layout } from 'antd';
const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 120px)',
	color: '#fff',
	backgroundColor: '#001529',
    padding: '1rem'
};

export default function AppContent(params) {
	return <Layout.Content style={contentStyle}></Layout.Content>;
}
