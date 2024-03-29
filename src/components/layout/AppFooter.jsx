import { Layout } from 'antd';

const footerStyle = {
	padding: '1rem',
};

export default function AppFooret() {
	return (
		<Layout.Footer
			style={{
				backgroundColor: '#001529',
				color: '#08131F',
				textAlign: 'center',
			}}>
			<div>
				<a
					style={{ color: '#436C94' }}
					href="https://github.com/Wilbemax"
					target="_blank">
					@Wilbemax 2024
				</a>
			</div>
		</Layout.Footer>
	);
}
