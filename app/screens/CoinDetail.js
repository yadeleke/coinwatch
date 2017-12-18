import React, { Component } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, Platform, RefreshControl} from 'react-native';
import { List, ListItem, Avatar, View } from 'react-native-elements';
import Numeral from 'numeral';

const { height, width } = Dimensions.get('window');

class CoinDetail extends Component {
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
			lastUpdated: null,
			refreshing: false
		};
		this.fetchData = this.fetchData.bind(this);
		this.refreshing = this.refreshing.bind(this);
	}

	componentWillMount() {
		this.setState({
			selectedCoin: this.props.navigation.state.params.CoinName
		});
	}

	componentDidMount() {
		this.fetchData();
	}
  
	refreshing() {
		this.setState({refreshing: true});
		this.fetchData();
	}

	fetchData() {
		let url = '';
		if(this.state.selectedCoin === 'Bitcoin Cash / BCC'){
			url = 'https://api.coinmarketcap.com/v1/ticker/bitcoin-cash';
		}else if(this.state.selectedCoin === 'DigitalCash'){
			url = 'https://api.coinmarketcap.com/v1/ticker/dash';
		} else{
			url = 'https://api.coinmarketcap.com/v1/ticker/' + this.state.selectedCoin;
		}
		
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
					lastUpdated: responseJson[0].last_updated,
					refreshing: false
				});
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
		if(!this.state.refreshing){
			return (
				<ScrollView contentContainerStyle={styles.contentContainer}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.refreshing}
						/>
					}>
					<Avatar
						containerStyle={{alignSelf: 'center',}}
						large
						rounded
						overlayContainerStyle={{backgroundColor: 'white'}}
						source={{ uri: ImageUrl}}
						activeOpacity={0.7}
					/>
					<Text style={styles.heading}>{name}</Text>
	
					<List>
						<ListItem
							title={`Market Rank: #${rank}`}
							hideChevron
						/>
						<ListItem
							title={`Price (USD): ${Numeral(priceUSD).format('$0,0.00')}`}
							hideChevron
						/>
						<ListItem
							title={`Price (BTC): ${priceBTC}`}
							hideChevron
						/>
						<ListItem
							title={`24h Volume (USD): ${Numeral(volume24HoursUSD).format('$0,0.00')}`}
							hideChevron
						/>
						<ListItem
							title={`Percent Change (Hour): ${percentChangeHour}%`}
							hideChevron
						/>
						<ListItem
							title={`Percent Change (Day): ${percentChangeDay}%`}
							hideChevron
						/>
						<ListItem
							title={`Percent Change (Week): ${percentChangeWeek}%`}
							hideChevron
						/>
					</List>
				</ScrollView>
			);
		}
		
	}
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		paddingVertical: 20,
		backgroundColor: 'white',
	},
	heading: {
		fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'sans-serif',
		fontSize: 30,
		alignSelf: 'center'
	}
});

export default CoinDetail;
