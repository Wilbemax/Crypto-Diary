import { cryptoAssets, cryptoData } from './data';

//Имуляция работы api

export async function fakeFetchCrypto() {
	try {
	   const options = {
		 method: 'GET',
		 headers: {
		   accept: 'application/json',
		   'X-API-KEY': 'YHTMk24MyPu4g4bbTCcuTz4TFuQ4/iR8yT2JTs1rmZ0='
		 }
	   };
   
	   const response = await fetch('https://openapiv1.coinstats.app/coins', options);
	   const result = await response.json();
	   return result;
	} catch (err) {
	   console.error(err);
	   return null;
	}
   }
   


export function fetchAssets() {
	return new Promise((resolve) => {
		setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
	});
}

