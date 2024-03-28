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
		return assets.map((asset) => {
			const coin = result.find((c) => c.id === asset.id);

			return {
				grow: asset.price < coin.price,
				growPercent: percentDifferents(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			};
		});
	}

	useEffect(() => {
		async function preload() {
			setLoading(true);
			const { result } = await fakeFetchCrypto();
			const assets = await fetchAssets();

			setCrypto(result);
			setAssets(mapAsset(assets, result));
			setLoading(false);
		}
		preload();
	}, []);

	function addNewAsset(newAsset) {
		
		setAssets((prev) => mapAsset([...prev, newAsset], crypto));
	}
	function updateAsset(coin, newAsset){
		// const existAsset = mapAsset([assets.find( a => coin === a.id)], crypto)
		// const doneAsset = mapAsset([newAsset], crypto)
		// const addAsset = 

		//доделать функционал обновления ассета если они совпадаю по суит надо сумировать сумму денег и эмаунта а вот с тотал профит надо подумать, возможно нужно просто посчиатьать два прфита и из первого вычесть вторео 

	}

	return (
		<CryptoConext.Provider value={{ loading, assets, crypto, addNewAsset, updateAsset }}>
			{children}
		</CryptoConext.Provider>
	);
}

export default CryptoConext;

export function useCrypto() {
	return useContext(CryptoConext);
}
