
function getTopCoins() {
	const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
	fetch(url).then(response => response.json())
		.then(responseJson => {
			let coinNames = [];
			for (var key in responseJson) {
				// skip loop if the property is from prototype
				if (!responseJson.hasOwnProperty(key)){
					continue;
				}
				coinnNames.push({
					Name: responseJson[key].name,
					Symbol: responseJson[key].symbol,
					Rank: responseJson[key].rank,
				})						
			}
			return coinNames;
		}).then((coinNames) => getAllCoins(coinNames)).catch((err) => {
			console.log(err);
		});
}

function getAllCoins(coinNames) {
	const url = 'https://www.cryptocompare.com/api/data/coinlist/';
	fetch(url).then(response => response.json())
		.then(responseJson => {
			return responseJson['Data'];  
		}).then( (coinNames, obj) => createDataStructure(coinNames, obj)).then((topCoins) => {
			let sortedTopCoins = topCoins.sort(function compare(a,b) {
				if (Number(a.Rank) < Number(b.Rank)){
					return -1;
				}else if (Number(a.Rank) > Number(b.Rank)){
					return 1;
				} else {
					return 0;
				}		
			})
			return sortedTopCoins;
		})
		.catch((err) => {
			console.log(err);
		});
}

function createDataStructure(coinNames, allCoins){
	let topCoins = [];
	for (var key in allCoins) {
		// skip loop if the property is from prototype
		if (!allCoins.hasOwnProperty(key)){
			continue;
		}
		coinNames.forEach((element) => {
			if(allCoins[key].Symbol === element.Symbol || allCoins[key].CoinName === element.Name)
		{
			topCoins.push(
				{
					Id: allCoins[key].Id,
					Rank: element.Rank,
					Url: 'https://www.cryptocompare.com' + allCoins[key].Url,
					ImageUrl: 'https://www.cryptocompare.com' + allCoins[key].ImageUrl,
					Name: allCoins[key].Name,
					Symbol: allCoins[key].Symbol,
					CoinName: allCoins[key].CoinName,
					FullName: allCoins[key].FullName,
					Algorithm: allCoins[key].Algorithm,
					ProofType: allCoins[key].ProofType,
					TotalCoinSupply: allCoins[key].TotalCoinSupply
				}
			);
		}	
		})
	}
	return topCoins;
}

getTopCoins();

// export const coins = topCoins;

// export const coins = [
// 	{
// 		Id: '1182',
// 		Url: 'https://www.cryptocompare.com/coins/btc/overview',
// 		ImageUrl: 'https://www.cryptocompare.com/media/19633/btc.png',
// 		Name: 'BTC',
// 		Symbol: 'BTC',
// 		CoinName: 'Bitcoin',
// 		FullName: 'Bitcoin (BTC)',
// 		Algorithm: 'SHA256',
// 		ProofType: 'PoW',
// 		TotalCoinSupply: '21000000',
// 	},
// 	{
// 		Id: '7605',
// 		Url: 'https://www.cryptocompare.com/coins/eth/overview',
// 		ImageUrl: 'https://www.cryptocompare.com/media/20646/eth_logo.png',
// 		Name: 'ETH',
// 		Symbol: 'ETH',
// 		CoinName: 'Ethereum',
// 		FullName: 'Ethereum (ETH)',
// 		Algorithm: 'Ethash',
// 		ProofType: 'PoW',
// 		TotalCoinSupply: '0',
// 	},
// 	{
// 		Id: '3808',
// 		Url: 'https://www.cryptocompare.com/coins/ltc/overview',
// 		ImageUrl: 'https://www.cryptocompare.com/media/19782/litecoin-logo.png',
// 		Name: 'LTC',
// 		Symbol: 'LTC',
// 		CoinName: 'Litecoin',
// 		FullName: 'Litecoin (LTC)',
// 		Algorithm: 'Scrypt',
// 		ProofType: 'PoW',
// 		TotalCoinSupply: '84000000',
// 	},
// 	{
// 		Id: '127356',
// 		Url: 'https://www.cryptocompare.com/coins/iot/overview',
// 		ImageUrl: 'https://www.cryptocompare.com//media/1383540/iota_logo.png',
// 		Name: 'IOT',
// 		Symbol: 'IOT',
// 		CoinName: 'IOTA',
// 		FullName: 'IOTA (IOT)',
// 		Algorithm: 'N/A',
// 		ProofType: 'Tangle',
// 		TotalCoinSupply: '2779530283',
// 	}
// ];
