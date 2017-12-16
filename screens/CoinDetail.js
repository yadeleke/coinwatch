/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions .get('window');
const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;
const coinLogo = {
  Bitcoin: './img/bitcoin.png',
  Iota: './img/iota.png',
  Litecoin: './img/litecoin.png'
}

export default class CoinDetail extends Component {
  constructor(){
    super();
    this.state = {
      selectedCoin: this.props.navigation.state.params,
      id: null, 
      name: null, 
      symbol: null, 
      rank: null, 
      priceUSD: null, 
      priceBTC: null, 
      volume24HoursUSD: null, 
      marketCapUsd: null, 
      availableSupply: null, 
      totalSupply: null, 
      maxSupply: null, 
      percentChangeHour: null, 
      percentChangeDay: null, 
      percentChangeWeek: null, 
      lastUpdated: null
    }
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    let url = 'https://api.coinmarketcap.com/v1/ticker/' + this.state.selectedCoin;
    fetch(url).then(response => response.json())
              .then(responseJson => {
                this.setState({
                  id: responseJson[0].id, 
                  name: responseJson[0].name, 
                  symbol: responseJson[0].symbol, 
                  rank: responseJson[0].rank, 
                  priceUSD: responseJson[0].price_usd, 
                  priceBTC: responseJson[0].price_btc, 
                  volume24HoursUSD: responseJson[0]['24h_volume_usd'], 
                  marketCapUsd: responseJson[0].market_cap_usd, 
                  availableSupply: responseJson[0].available_supply, 
                  totalSupply: responseJson[0].total_supply, 
                  maxSupply: responseJson[0].max_supply, 
                  percentChangeHour: responseJson[0].percent_change_1h, 
                  percentChangeDay: responseJson[0].percent_change_24h, 
                  percentChangeWeek: responseJson[0].percent_change_7d, 
                  lastUpdated: responseJson[0].last_updated
                 })
      console.log(this.state);
    } 
    ).catch((err) => {
        console.log(err);
    });
  }  

  // renderLogo(coin){
  //   return(
  //     <View style={styles.mainLogoContainer}>
  //         <Image 
  //             style={styles.mainLogo}
  //             source={require(coinLogo.coin)}   
  //             resizeMode={'contain'}   
  //         />
  //     </View>
  //   )
  // }

  render() {
    return (
      <View style={styles.container}>
          <Text> Hello World</Text>
          {/* <Image 
              style={styles.mainLogo}
              source={require({coin.coinLogo})}   
              resizeMode={'contain'}   
          /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainLogoContainer: {
    flex : 1,
    justifyContent: 'flex-end'
  },
  mainLogo: {
    width: width,
  },
  buttonContainer: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 10,
}
});

