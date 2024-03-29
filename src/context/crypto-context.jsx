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

	// Функция для сохранения assets в localStorage
	const saveAssetsToLocalStorage = (assets) => {
		localStorage.setItem('assets', JSON.stringify(assets));
	};

	// Функция для извлечения assets из localStorage
	const loadAssetsFromLocalStorage = () => {
		const savedAssets = localStorage.getItem('assets');
		return savedAssets ? JSON.parse(savedAssets) : [];
	};

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

			const savedAssets = loadAssetsFromLocalStorage();
			setAssets(mapAsset(savedAssets, result));
			setLoading(false);
		}
		preload();
	}, []);

	function addNewAsset(newAsset) {
		setAssets((prev) => {
			// Проверяем, существует ли ассет с таким же id
			const existingAssetIndex = prev.findIndex(
				(asset) => asset.id === newAsset.id
			);

			if (existingAssetIndex !== -1) {
				// Если ассет существует, обновляем его сумму и количество
				const doneAs = mapAsset([newAsset], crypto)[0];
				console.log(doneAs);

				const updatedAssets = [...prev];
				const existingAsset = updatedAssets[existingAssetIndex];
				console.log(existingAsset);
				const updatedAsset = {
					...existingAsset,
					amount: existingAsset.amount + newAsset.amount,
					growPercent: existingAsset.growPercent - doneAs.growPercent,
					totalProfit: existingAsset.totalProfit + doneAs.totalProfit,
				};
				updatedAssets[existingAssetIndex] = updatedAsset;
				// Обновляем localStorage с обновленным ассетом
				saveAssetsToLocalStorage(updatedAssets);
				return updatedAssets;
			} else {
				// Если ассет не существует, добавляем его в список
				const updatedAssets = mapAsset([...prev, newAsset], crypto);
				// Обновляем localStorage с новым ассетом
				saveAssetsToLocalStorage(updatedAssets);
				return updatedAssets;
			}
		});
	}

	function deletAsset(asset) {
		setAssets((prev) => {
			const updatedAssets = prev.filter((a) => a.id !== asset.id);
			saveAssetsToLocalStorage(updatedAssets);
			return updatedAssets;
		});
	}

	return (
		<CryptoConext.Provider
			value={{ loading, assets, crypto, addNewAsset, deletAsset }}>
			{children}
		</CryptoConext.Provider>
	);
}

export default CryptoConext;

export function useCrypto() {
	return useContext(CryptoConext);
}
