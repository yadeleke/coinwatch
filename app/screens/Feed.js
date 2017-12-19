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
      Price: null,
      refreshing: true
    }
    this.fetchData = this.fetchData.bind(this);
    this.getAllCoins = this.getAllCoins.bind(this);
    this.getTopCoins = this.getTopCoins.bind(this);
    this.createDataStructure = this.createDataStructure.bind(this);
  }

  onLearnMore = (coin) => {
    this.setState({
      selectedCoin: coin.Name
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
            Price: responseJson[key].price_usd,
            ImageUrl: null
          })					
        }
        return coinNames;
			}).then(coinNames => this.getAllCoins(coinNames)).catch((err) => {
				console.log(err);
			});
	}
	
	getAllCoins(coinNames) {
    //TODO: Get coin description from api 
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
                key={coin.Symbol}
                roundAvatar
                avatar={{ uri: coin.ImageUrl }}
                avatarOverlayContainerStyle={{backgroundColor: 'white'}}
                title={coin.Name} 
                subtitle={`${Numeral(coin.Price).format('$0,0.00')}`}
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