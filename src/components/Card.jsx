import { Card, Statistic, List, Typography, Tag } from 'antd';
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	DeleteOutlined,
} from '@ant-design/icons';

import { capitalize } from '../utils';
import { useCrypto } from '../context/crypto-context';

export default function CardList({ assets }) {
	const {deletAsset} = useCrypto()
	return (
		<div>
			{assets.map((asset) => (
				<Card
					key={asset.id}
					style={{ marginBottom: '1rem', minWidth: 265 }}
					actions={[
						<DeleteOutlined
							key="delet"
							style={{ color: 'red' }}
							onClick={() => deletAsset(asset)}
						/>,
					]}>
					<Statistic
						title={capitalize(asset.id)}
						value={asset.totalAmount}
						precision={2}
						valueStyle={{
							color: asset.grow ? '#3f8600' : '#cf1322',
						}}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix="$"
					/>
					<List
						size="small"
						dataSource={[
							{
								title: 'Total Profit',
								value: asset.totalProfit,
								withTag: true,
							},
							{ title: 'Asset Amount', value: asset.amount, isPlain: true },
						]}
						renderItem={(item) => (
							<List.Item>
								<span>{item.title} </span>

								<span>
									{item.withTag && (
										<Tag color={asset.grow >= 0 ? 'green' : 'red'}>
											{asset.growPercent.toFixed(2)}%
										</Tag>
									)}
									{item.isPlain && (
										<Typography.Text> {item.value}</Typography.Text>
									)}
									{!item.isPlain && (
										<Typography.Text
											type={asset.grow >= 0 ? 'success' : 'danger'}>
											{' '}
											{item.value.toFixed(2)}$
										</Typography.Text>
									)}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</div>
	);
}
