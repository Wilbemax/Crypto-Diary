import { createContext, useState, useEffect, useContext } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifferents } from '../utils';

const CryptoConext = createContext({
	assers: [],
	crypto: [],
	loading: false,
});

export function CryproContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [crypto, setCrypto] = useState([]);
	const [assets, setAssets] = useState([]);

	function mapAsset(assets, result) {
		return assets.map(asset => {
			const coin = result.find((c) => c.id === asset.id);

		return {
			grow: asset.price < coin.price,
			growPercent: percentDifferents(asset.price, coin.price),
			totalAmount: asset.amount * coin.price,
			totalProfit: asset.amount * coin.price - asset.amount * asset.price,

			...asset,
		};
		})}
	

	useEffect(() => {
		async function preload() {
			setLoading(true);
			const { result } = await fakeFetchCrypto();
			const assets = await fetchAssets();

			setCrypto(result);
			setAssets( mapAsset(assets,result));
			setLoading(false);
		}
		preload();
	}, []);

	function addAsset(newAsset) {
		setAssets((prev) => mapAsset([...prev, newAsset], crypto));
	}

	return (
		<CryptoConext.Provider value={{ loading, assets, crypto, addAsset }}>
			{children}
		</CryptoConext.Provider>
	);
}

export default CryptoConext;

export function useCrypto() {
	return useContext(CryptoConext);
}
