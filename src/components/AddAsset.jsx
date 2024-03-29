import { useRef, useState } from 'react';
import {
	Select,
	Space,
	Form,
	DatePicker,
	Button,
	Checkbox,
	InputNumber,
	Result,
} from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';

export default function AddAsset({ onClose }) {
	const [submited, setSubmeted] = useState(false);
	const [form] = Form.useForm();
	const [coin, setCoin] = useState(null);
	const { crypto, addNewAsset, assets, updateAsset } = useCrypto();
	const assetRef = useRef();

	console.log(assets);

	const onFinish = (values) => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			data: values.data?.$d ?? new Date(),
		};
		assetRef.current = newAsset;
		setSubmeted(true);

		addNewAsset(newAsset);
	};

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	const validateMessage = {
		required: '${label} is requierd!',
		types: {
			number: '${label} is not valid number',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		},
	};

	function handleAmounChange(value) {
		const price = form.getFieldsValue('price');
		console.log(value, price);

		form.setFieldsValue({
			total: +(value * price.price).toFixed(2),
		});
	}
	function handleCostChange(value) {
		const amount = form.getFieldsValue('amount');
		console.log(value, amount);
		form.setFieldsValue({
			total: +(amount.amount * value).toFixed(2),
		});
	}

	if (submited) {
		return (
			<Result
				status="success"
				title="New Asset Added"
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button
						type="primary"
						key="console"
						onClick={onClose}>
						Close
					</Button>,
				]}
			/>
		);
	}

	if (!coin) {
		return (
			<Select
				style={{
					width: '100%',
				}}
				onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
				placeholder="Select coin"
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							atl={option.data.label}
						/>{' '}
						{option.data.label}
					</Space>
				)}
			/>
		);
	}
	return (
		<Form
			form={form}
			name="basic"
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 10,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				price: +coin.price.toFixed(2),
			}}
			onFinish={onFinish}
			validateMessages={validateMessage}>
			<CoinInfo coin={coin} />
			<Form.Item
				label="Amount"
				name="amount"
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
					},
				]}>
				<InputNumber
					placeholder="Enter coin amount"
					onChange={(v) => handleAmounChange(v)}
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item
				label="Price"
				name="price"
				rules={[
					{
						type: 'number',
					},
				]}>
				<InputNumber
					onChange={(v) => handleCostChange(v)}
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item
				label="Date"
				name="date">
				<DatePicker
					onChange={onChange}
					showTime
					needConfirm={false}
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item
				label="Total"
				name="total">
				<InputNumber
					disabled
					style={{ width: '100%' }}
				/>
			</Form.Item>


			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}>
				<Button
					type="primary"
					htmlType="submit">
					Add Asset
				</Button>
			</Form.Item>
		</Form>
	);
}
