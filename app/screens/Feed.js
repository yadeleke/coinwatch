import React, { Component } from 'react';
import { Text,View, ScrollView, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Numeral from "numeral";

import { coins } from '../config/data';

class Feed extends Component {
  constructor(){
    super();
    this.state = {
      selectedCoin: null,
      Bitcoin: null,
      Ethereum: null,
      Litecoin: null,
      refreshing: false
    }
    this.fetchData = this.fetchData.bind(this);
  }

  onLearnMore = (coin) => {
    this.setState({
      selectedCoin: coin.CoinName
     })
    this.props.navigation.navigate('Details', { ...coin });
  };

  fetchData(){
    this.setState({refreshing: true});
    let price = '';
    const url1 = 'https://api.coinmarketcap.com/v1/ticker/bitcoin' 
    const url2 = 'https://api.coinmarketcap.com/v1/ticker/ethereum' 
    const url3 = 'https://api.coinmarketcap.com/v1/ticker/litecoin' 

    Promise.all([
      fetch("https://api.coinmarketcap.com/v1/ticker/bitcoin"),
      fetch("https://api.coinmarketcap.com/v1/ticker/ethereum"),
      fetch("https://api.coinmarketcap.com/v1/ticker/litecoin"),
    ]).then((responseArray) => Promise.all(responseArray.map(item => item.json()))).then((responseJsonArray) => {
        console.log(responseJsonArray);
        this.setState({
          Bitcoin: Numeral(responseJsonArray[0][0].price_usd).format('$0,0.00'),
          Ethereum: Numeral(responseJsonArray[1][0].price_usd).format('$0,0.00'),
          Litecoin: Numeral(responseJsonArray[2][0].price_usd).format('$0,0.00'),
          refreshing: false
        })
      });
    }
  
     
    // fetch(url1).then(response => response.json()
    //           .then(responseJson => {
    //             this.setState({
    //               Bitcoin: Numeral(responseJson[0].price_usd).format('$0,0.00')
    //              })
    //           }).catch((err) => {
    //     console.log(err);
    // })).then(
    // fetch(url2).then(response => response.json()
    //           .then(responseJson => {
    //             this.setState({
    //               Ethereum: Numeral(responseJson[0].price_usd).format('$0,0.00')
    //              })
    //           }).catch((err) => {
    //     console.log(err);
    // }))).then(
    // fetch(url3).then(response => response.json()
    //           .then(responseJson => {
    //             this.setState({
    //               Litecoin: Numeral(responseJson[0].price_usd).format('$0,0.00')
    //              }) 
    //           }).catch((err) => {
    //     console.log(err);
    // }))).then(() => {
    //   this.setState({refreshing: false});
    // });

  componentDidMount() {
    this.fetchData();
  }

  render() {
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
              key={coin.Id}
              roundAvatar
              avatar={{ uri: coin.ImageUrl }}
              title={coin.FullName} 
              subtitle={this.state[coin.CoinName]}
              onPress={() => this.onLearnMore(coin)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Feed;
