import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Numeral from "numeral";

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCoin: null,
      coins: null,
      refreshing: true
    }
    this.fetchData = this.fetchData.bind(this);
    this.getAllCoins = this.getAllCoins.bind(this);
    this.getTopCoins = this.getTopCoins.bind(this);
    this.createDataStructure = this.createDataStructure.bind(this);
  }

  onLearnMore = (coin) => {
    this.props.navigation.navigate('Details', { ...coin });
  };

  getTopCoins() {
		const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
		fetch(url).then(response => response.json())
			.then(responseJson => {
        let coinNames = [];
				for (var key in responseJson) {
					// skip loop if the property is from prototype
					if (!responseJson.hasOwnProperty(key)){
						continue;
					}
					coinNames.push({
						id: responseJson[key].id,
						name: responseJson[key].name,
						symbol: responseJson[key].symbol,
            rank: responseJson[key].rank,
				  	priceUSD: responseJson[key].price_usd, 
            priceBTC: responseJson[key].price_btc, 
            volume24HoursUSD: responseJson[key]['24h_volume_usd'], 
            marketCapUSD: responseJson[key].market_cap_usd, 
            availableSupply: responseJson[key].available_supply, 
            totalSupply: responseJson[key].total_supply, 
            maxSupply: responseJson[key].max_supply, 
            percentChangeHour: responseJson[key].percent_change_1h, 
            percentChangeDay: responseJson[key].percent_change_24h, 
            percentChangeWeek: responseJson[key].percent_change_7d, 
            imageUrl: null
          })					
        }
        return coinNames;
			}).then(coinNames => this.getAllCoins(coinNames)).catch((err) => {
				console.log(err);
			});
	}
	
	getAllCoins(coinNames) {
		const url = 'https://www.cryptocompare.com/api/data/coinlist/';
		fetch(url).then(response => response.json())
			.then(responseJson => {
        return [coinNames,responseJson['Data']];  
			}).then( arr => this.createDataStructure(arr)).then(topCoins => {
				let sortedTopCoins = topCoins.sort(function compare(a,b) {
					if (Number(a.rank) < Number(b.rank)){
						return -1;
					}else if (Number(a.rank) > Number(b.rank)){
						return 1;
					} else {
						return 0;
					}		
        })
        return sortedTopCoins;
			}).then(sortedTopCoins => this.fetchData(sortedTopCoins))
			.catch((err) => {
				console.log(err);
			});
	}
	
	createDataStructure(arr){
    let coinNames = arr[0];
    let allCoins = arr[1];
		let topCoins = coinNames;
		for (var key in allCoins) {
			// skip loop if the property is from prototype
			if (!allCoins.hasOwnProperty(key)){
				continue;
			}
			coinNames.forEach((element) => {
				if(allCoins[key].Symbol === element.symbol || allCoins[key].CoinName === element.name)
			{
        element.imageUrl = 'https://www.cryptocompare.com' + allCoins[key].ImageUrl;
        element.id = allCoins[key].Id;
			}	
      })
    }
		return topCoins;
	}

  fetchData(sortedTopCoins){
    if(sortedTopCoins){
      this.setState({
        coins: sortedTopCoins,
        refreshing: false
      })
    }   
  }

  componentDidMount() {
    this.getTopCoins();
  }

  render() {
    const {refreshing, coins} = this.state;
    if(refreshing){
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }else{
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchData}
            />
          }>
          <List>
            {coins.map((coin) => (
              <ListItem
                key={coin.symbol}
                roundAvatar
                avatar={{ uri: coin.imageUrl }}
                avatarOverlayContainerStyle={{backgroundColor: 'white'}}
                title={coin.name} 
                subtitle={`${Numeral(coin.priceUSD).format('$0,0.00')}`}
                onPress={() => this.onLearnMore(coin)}
              />
            ))}
          </List>
        </ScrollView>
      );
    }
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
