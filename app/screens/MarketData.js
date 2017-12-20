import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import { Avatar} from 'react-native-elements';
import Numeral from 'numeral';

import { Divider, Caption} from '@shoutem/ui';

import RowTwoColumns from '../components/RowTwoColumns';

export default class MarketData extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedCoin: null,
			id: null,
			name: null,
			symbol: null,
			rank: null,
			priceUSD: null, 
			priceBTC: null, 
			volume24HoursUSD: null, 
			marketCapUSD: null, 
			availableSupply: null, 
			totalSupply: null, 
			maxSupply: null, 
			percentChangeHour: null, 
			percentChangeDay: null, 
			percentChangeWeek: null, 
			imageUrl: null,
			refreshing: false
		};
		this.fetchData = this.fetchData.bind(this);
		this.refreshing = this.refreshing.bind(this);
	}

	componentWillMount() {
		this.setState({
			id: this.props.navigation.state.params.id,
			name: this.props.navigation.state.params.name,
			symbol: this.props.navigation.state.params.symbol,
			rank: this.props.navigation.state.params.rank,
			priceUSD: this.props.navigation.state.params.priceUSD, 
			priceBTC: this.props.navigation.state.params.priceBTC, 
			volume24HoursUSD: this.props.navigation.state.params.volume24HoursUSD, 
			marketCapUSD: this.props.navigation.state.params.marketCapUSD, 
			availableSupply: this.props.navigation.state.params.availableSupply, 
			totalSupply: this.props.navigation.state.params.totalSupply, 
			maxSupply: this.props.navigation.state.params.maxSupply, 
			percentChangeHour: this.props.navigation.state.params.percentChangeHour, 
			percentChangeDay: this.props.navigation.state.params.percentChangeDay, 
			percentChangeWeek: this.props.navigation.state.params.percentChangeWeek, 
			imageUrl: this.props.navigation.state.params.imageUrl,
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
		let url = 'https://api.coinmarketcap.com/v1/ticker/' + this.state.name;
		
		fetch(url).then(response => response.json())
			.then(responseJson => {
				this.setState({
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
					refreshing: false
				});
			} 
			).catch((err) => {
				console.log(err);
			});
	}


	render() {
		const { id, name, rank, imageUrl, priceUSD, priceBTC, volume24HoursUSD, percentChangeHour, percentChangeDay, 
			percentChangeWeek, refreshing} = this.state;
		if(!refreshing){
			return (
				<ScrollView contentContainerStyle={styles.container}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.fetchData}
						/>
					}>

					<Avatar
						containerStyle={{alignSelf: 'center', marginVertical: 10}}
						large
						rounded
						overlayContainerStyle={{backgroundColor: 'white'}}
						source={{ uri: imageUrl}}
						activeOpacity={0.7}
					/>
					<Divider styleName="section-header">
  						<Caption>{name}</Caption>
					</Divider>
	
					<Divider styleName="line" />

					<RowTwoColumns label="Market Rank:" value={`#${rank}`} />

					<Divider styleName="line" />

					<RowTwoColumns label="Price (USD):" value={Numeral(priceUSD).format('$0,0.00')} />

					<Divider styleName="line" />

					<RowTwoColumns label="Price (BTC):" value={`${priceBTC} BTC`} />

					<Divider styleName="line" />

					<RowTwoColumns label="24h Volume (USD):" value={Numeral(volume24HoursUSD).format('$0,0.00')} />

					<Divider styleName="line" />

					<RowTwoColumns label="Percent Change (Hour):" value={`${percentChangeHour}%`}/>

					<Divider styleName="line" />

					<RowTwoColumns label="Percent Change (Day):" value={`${percentChangeDay}%`} />

					<Divider styleName="line" />

					<RowTwoColumns label="Percent Change (Week):" value={`${percentChangeWeek}%`} />

				</ScrollView>
			);
		} else {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}
		
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center'
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}

});

