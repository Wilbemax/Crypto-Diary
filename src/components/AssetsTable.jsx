import { Table } from 'antd';
import { useCrypto } from '../context/crypto-context';
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',

		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Prise, $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.amount - b.amount,
	},
];

export default function AssetsTable(params) {
	const { assets } = useCrypto();
	console.log(assets);
	const data = assets.map((asset) => ({
		key: asset.id,
		name: asset.name,
		price: asset.totalAmount.toFixed(2),
		amount: asset.amount,
	}));

	return (
		<Table
			pagination={false}
			columns={columns}
			dataSource={data}
		/>
	);
}
