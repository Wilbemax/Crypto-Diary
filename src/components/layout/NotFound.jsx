import Marquee from 'react-fast-marquee';
import { Alert, Layout } from 'antd';
const contentStyle = {
	paddingTop: '40vh',
	minHeight: ' calc(100vh - 120px)',
	backgroundColor: '#001529',
};
const NotFound = () => (
	<Layout.Content style={contentStyle}>
		<Alert
			banner
			message={
				<Marquee
					pauseOnHover
					gradient={false}>
					Добавьте новый asset, что бы увидеть функционал
				</Marquee>
			}
		/>
	</Layout.Content>
);
export default NotFound;
