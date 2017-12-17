import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
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
      Litecoin: null
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
    let price = '';
    const url1 = 'https://api.coinmarketcap.com/v1/ticker/bitcoin' 
    const url2 = 'https://api.coinmarketcap.com/v1/ticker/ethereum' 
    const url3 = 'https://api.coinmarketcap.com/v1/ticker/litecoin' 
    fetch(url1).then(response => response.json()
              .then(responseJson => {
                this.setState({
                  Bitcoin: Numeral(responseJson[0].price_usd).format('$0,0.00')
                 })
              }).catch((err) => {
        console.log(err);
    }))
    fetch(url2).then(response => response.json()
              .then(responseJson => {
                this.setState({
                  Ethereum: Numeral(responseJson[0].price_usd).format('$0,0.00')
                 })
              }).catch((err) => {
        console.log(err);
    }))
    fetch(url3).then(response => response.json()
              .then(responseJson => {
                this.setState({
                  Litecoin: Numeral(responseJson[0].price_usd).format('$0,0.00')
                 }) 
              }).catch((err) => {
        console.log(err);
    }))
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <ScrollView>
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
