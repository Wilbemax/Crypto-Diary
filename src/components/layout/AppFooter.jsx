import { Layout } from 'antd';

const footerStyle = {
	textAlign: 'center',
	color: '#fff',
	height: 60,
	backgroundColor: '#4096ff',
};


export default function AppFooret() {
    return(
		<Layout.Footer style={footerStyle}>Footer</Layout.Footer>
		)
}
