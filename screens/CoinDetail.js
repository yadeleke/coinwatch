/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Button, Header} from 'react-native-elements';

const { width, height } = Dimensions .get('window');
const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;
const coinLogo = {
  bitcoin: require('../img/bitcoin.png'),
  iota: require('../img/iota.png'),
  litecoin: require('../img/litecoin.png')
}

export default class CoinDetail extends Component {
  constructor(){
    super();
    this.state = {
      selectedCoin: null,
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
    this.renderLogo = this.renderLogo.bind(this);
  }

  componentWillMount() {
    this.setState({
      selectedCoin: this.props.navigation.state.params.selectedCoin
    });
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
                  marketCapUSD: responseJson[0].market_cap_usd, 
                  availableSupply: responseJson[0].available_supply, 
                  totalSupply: responseJson[0].total_supply, 
                  maxSupply: responseJson[0].max_supply, 
                  percentChangeHour: responseJson[0].percent_change_1h, 
                  percentChangeDay: responseJson[0].percent_change_24h, 
                  percentChangeWeek: responseJson[0].percent_change_7d, 
                  lastUpdated: responseJson[0].last_updated
                 })
    } 
    ).catch((err) => {
        console.log(err);
    });
  }  

  renderLogo(name){
    if(name.name){
      let coinName = name.name.toLowerCase();
      console.log(coinName);
      switch (coinName) {
        case 'bitcoin' : 
          return <Image 
                    style={styles.mainLogo}
                    source ={require('../img/bitcoin.png')}
                    resizeMode={'contain'}   
                  />
        case 'iota':
          return <Image 
                    style={styles.mainLogo}
                    source ={require('../img/iota.png')}
                    resizeMode={'contain'}   
                  />
        case 'litecoin' : 
          return <Image 
                    style={styles.mainLogo}
                    source ={require('../img/litecoin.png')}
                    resizeMode={'contain'}   
                />
        default: return (<Text>{'Null'}</Text>);
      }
    }
  }

  render() {

    const { id, name, symbol, bitfinexPriceBTC, rank, priceUSD, priceBTC, volume24hoursUSD, marketCapUSD,
            availableSupply, totalSupply, maxSupply,  percentChangeHour,
       percentChangeDay, percentChangeWeek, lastUpdated} = this.state;
    
    return (
      <View style={styles.container}>
        <Text>{name} </Text>
        <View style={styles.mainLogoContainer}>
         {this.renderLogo({name})}
        </View>
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 3,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>Market Rank:</Text>
            <Text style={styles.welcome}>#{rank}</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>USD Price:</Text>
            <Text style={styles.welcome}>${priceUSD}</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>BTC Price:</Text>
            <Text style={styles.welcome}>{priceBTC}</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>24h Volume:</Text>
            <Text style={styles.welcome}>{volume24hoursUSD}</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>Percent Change (Hour):</Text>
            <Text style={styles.welcome}>{percentChangeHour}%</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>Percent Change (Day):</Text>
            <Text style={styles.welcome}>{percentChangeDay}%</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.row}>
            <Text style={styles.welcome}>Percent Change (Week):</Text>
            <Text style={styles.welcome}>{percentChangeWeek}%</Text>
        </View> 
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 3,
            marginBottom: 30
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            // icon={{name: 'cached'}}
            title='Refresh'
            backgroundColor='#2b7cff'
            onPress={this.fetchData} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: 'white',
    // alignSelf :'stretch',
    //alignContent: 'stretch',
  },
  mainLogoContainer: {
    flex : 1,
    justifyContent: 'flex-end'
  },
  mainLogo: {
    width: width,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
  },  
  buttonContainer: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 10,
}
});

