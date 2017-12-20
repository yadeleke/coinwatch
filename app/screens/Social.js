import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Social extends Component {
	constructor(){
		super();
		this.state = {
			coinName: null,
		};
	}

	componentWillMount() {
		this.setState({
			coinName: this.props.navigation.state.params.name
		});
	}

	showTwitter = (coin) => {
	  this.props.navigation.navigate('Twitter', {coin});
	}

	showReddit = (coin) => {
	  this.props.navigation.navigate('Reddit', {coin});
	}
	render() {
		const {CoinName} = this.state;
		return (
			<ScrollView>
				<List>
					<ListItem
						roundAvatar
						avatar={require('../../img/twitter.png')}
						avatarOverlayContainerStyle={{backgroundColor: 'white'}}
						title='Twitter'
						subtitle={CoinName}
						onPress={() => this.showTwitter({coin})}
					/>
					<ListItem
						roundAvatar
						avatar={require('../../img/reddit.png')}
						avatarOverlayContainerStyle={{backgroundColor: 'white'}}
						title='Reddit'
						subtitle={CoinName}
						onPress={() => this.showReddit({coin})}
					/>
					<ListItem
						roundAvatar
						avatar={require('../../img/reddit.png')}
						avatarOverlayContainerStyle={{backgroundColor: 'white'}}
						title='Reddit'
						subtitle='/r/Cryptocurrency'
						onPress={() => this.showReddit({coin})}
					/>
				</List>
			</ScrollView>
		);
	}
}
