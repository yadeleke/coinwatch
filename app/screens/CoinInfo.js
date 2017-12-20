import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, WebView, RefreshControl, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Divider, Caption } from '@shoutem/ui';

export default class CoinInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: props.navigation.state.params.id, 
			name: props.navigation.state.params.name,
			imageUrl: props.navigation.state.params.imageUrl,
			description: null,
			features: null,
			technology: null,
			twitter: null,
			websiteLink: null,
			whitepaperLink: null,
			refreshing: true
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData() {
		let url = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=' + this.state.id;
		
		fetch(url).then(response => response.json())
			.then(responseJson => {
				this.setState({
					description: responseJson.Data.General.Description,
					features: responseJson.Data.General.Features,
					technology: responseJson.Data.General.Technology,
					twitter: responseJson.Data.General.Twitter,
					websiteLink: responseJson.Data.General.AffiliateUrl,
					whitepaperLink: responseJson.Data.ICO.WhitePaper,
					refreshing: false
				});
			} 
			).catch((err) => {
				console.log(err);
			});
	}

	render() {
		const { name, imageUrl, description, features, technology, twitter, websiteLink, whitepaperLink, refreshing} = this.state;
		if(refreshing){
			return (
			  <View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" color="#0000ff" />
			  </View>
			)
		}else{
			return (
				<View style={styles.container}>
					<Avatar
						containerStyle={{alignSelf: 'center', marginVertical: 10}}
						large
						rounded
						overlayContainerStyle={{backgroundColor: 'white'}}
						source={{ uri: imageUrl}}
						activeOpacity={0.7}
					/>
					<Text style={styles.heading}>{name}</Text>
					<Divider styleName="section-header">
  						<Caption>Description</Caption>
					</Divider>
					<WebView
						source={{html: description}}
						style={{marginTop: 20}}
					/>
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
	heading: {
		fontSize: 30,
		alignSelf: 'center'
	}
});
