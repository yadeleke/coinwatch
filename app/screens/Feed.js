import React, { Component } from 'react';
import { Text,View, ScrollView, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Numeral from "numeral";

// import { coins } from '../config/data';

class Feed extends Component {
  constructor(){
    super();
    this.state = {
      selectedCoin: null,
      coins: null,
      "1" : null,
      "2" : null,
      "3" : null,
      "4" : null,
      "5" : null,
      "6" : null,
      "7" : null,
      "8" : null,
      "9" : null,
     "10" : null,
      refreshing: true
    }
    this.fetchData = this.fetchData.bind(this);
    this.getAllCoins = this.getAllCoins.bind(this);
    this.getTopCoins = this.getTopCoins.bind(this);
    this.createDataStructure = this.createDataStructure.bind(this);
  }

  onLearnMore = (coin) => {
    this.setState({
      selectedCoin: coin.CoinName
     })
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
						Name: responseJson[key].name,
						Symbol: responseJson[key].symbol,
            Rank: responseJson[key].rank,
            ImageUrl: null
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
					if (Number(a.Rank) < Number(b.Rank)){
						return -1;
					}else if (Number(a.Rank) > Number(b.Rank)){
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
				if(allCoins[key].Symbol === element.Symbol || allCoins[key].CoinName === element.Name)
			{
        element.ImageUrl = 'https://www.cryptocompare.com' + allCoins[key].ImageUrl;
			}	
      })
    }
		return topCoins;
	}

  fetchData(sortedTopCoins){
    if(sortedTopCoins){
      this.setState({
        coins: sortedTopCoins,
      })
    }   
    Promise.all([
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[0].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[1].Name),
      // fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[2].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[3].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[4].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[5].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[6].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[7].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[8].Name),
      fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coins[9].Name),
    ]).then((responseArray) => Promise.all(responseArray.map(item => item.json()))).then((responseJsonArray) => {
      this.setState({
          
          '1': Numeral(responseJsonArray[0][0].price_usd).format('$0,0.00'),
          '2': Numeral(responseJsonArray[1][0].price_usd).format('$0,0.00'),
          '3': Numeral(responseJsonArray[2][0].price_usd).format('$0,0.00'),
          '4': Numeral(responseJsonArray[3][0].price_usd).format('$0,0.00'),
          '5': Numeral(responseJsonArray[4][0].price_usd).format('$0,0.00'),
          '6': Numeral(responseJsonArray[5][0].price_usd).format('$0,0.00'),
          '7': Numeral(responseJsonArray[6][0].price_usd).format('$0,0.00'),
          '8': Numeral(responseJsonArray[7][0].price_usd).format('$0,0.00'),
          '9': Numeral(responseJsonArray[8][0].price_usd).format('$0,0.00'),
          '10': Numeral(responseJsonArray[9][0].price_usd).format('$0,0.00'),
          refreshing: false
        })
     } 
  ).catch((err) => {
        console.log(err);
    });
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
                key={coin.Symbol}
                roundAvatar
                avatar={{ uri: coin.ImageUrl }}
                avatarOverlayContainerStyle={{backgroundColor: 'white'}}
                title={coin.Name} 
                subtitle={this.state[coin.Rank]}
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

export default Feed;