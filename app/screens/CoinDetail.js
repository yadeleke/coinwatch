import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Numeral from "numeral";

const { width, height } = Dimensions .get('window');
const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;


class CoinDetail extends Component {
  constructor(){
    super();
    this.state = {
      width: DEVICE_WIDTH * 0.5,
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
  }

  componentWillMount() {
    this.setState({
      selectedCoin: this.props.navigation.state.params.CoinName
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
                  volume24HoursUSD: responseJson[0]["24h_volume_usd"], 
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


  render() {
    const {ImageUrl} = this.props.navigation.state.params;

    const { id, name, symbol, bitfinexPriceBTC, rank, priceUSD, priceBTC, volume24HoursUSD, marketCapUSD,
      availableSupply, totalSupply, maxSupply,  percentChangeHour,
 percentChangeDay, percentChangeWeek, lastUpdated} = this.state;

    const {width} = this.state

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: ImageUrl}}
          title={name}
          onPress={this.fetchData}
          height = {width} 
        />

        <List>
          <ListItem
            title="Price (USD):"
            rightTitle={Numeral(priceUSD).format('$0,0.00')}
            hideChevron
          />
          <ListItem
            title="Price (BTC):"
            rightTitle={priceBTC}
            hideChevron
          />
          <ListItem
            title="24h Volume (USD):"
            rightTitle={Numeral(volume24HoursUSD).format('$0,0.00')}
            hideChevron
          />
          <ListItem
            title="Percent Change (Hour):"
            rightTitle={`${percentChangeHour}%`}
            hideChevron
          />
          <ListItem
            title="Percent Change (Day):"
            rightTitle={`${percentChangeDay}%`}
            hideChevron
          />
          <ListItem
            title="Percent Change (Week):"
            rightTitle={`${percentChangeWeek}%`}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

export default CoinDetail;
