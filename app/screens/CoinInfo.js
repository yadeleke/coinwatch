import React, { Component } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { Avatar, View } from 'react-native-elements';

export default class CoinInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: null, 
			name: null,
			imageUrl: null,
			description: null,
			features: null,
			technology: null,
			twitter: null,
			websiteLink: null,
			whitepaperLink: null
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentWillMount() {
		this.setState({
			id: this.props.navigation.state.params.id,
			name: this.props.navigation.state.params.name,
			imageUrl: this.props.navigation.state.params.imageUrl
		});
	}

	fetchData() {
		let url = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=' + this.state.id;
		
		fetch(url).then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);
				this.setState({
					description: null,
					features: null,
					technology: null,
					twitter: null,
					websiteLink: null,
					whitepaperLink: null
				});
				
			} 
			).catch((err) => {
				console.log(err);
			});
	}


	render() {
		const { name, imageUrl} = this.state;
		return (
			<View style={styles.container}>
				<Avatar
					containerStyle={{alignSelf: 'center',}}
					large
					rounded
					overlayContainerStyle={{backgroundColor: 'white'}}
					source={{ uri: imageUrl}}
					activeOpacity={0.7}
				/>
				<Text style={styles.heading}>{name}</Text>
			</View>
		);
		
	}
}

const styles = StyleSheet.create({
	container: {
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