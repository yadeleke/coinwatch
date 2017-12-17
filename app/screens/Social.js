import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Feed extends Component {
	constructor(){
		super();
		this.state = {
			coin: null,
		};
	}

	componentWillMount() {
		this.setState({
			coin: this.props.navigation.state.params.CoinName
		});
	}

	showTwitter = (coin) => {
	  this.props.navigation.navigate('Twitter', {coin});
	}

	showReddit = (coin) => {
	  this.props.navigation.navigate('Reddit', {coin});
	}
	render() {
		const {coin} = this.state;
		return (
			<ScrollView>
				<List>
					<ListItem
						roundAvatar
						avatar={require('../../img/twitter.png')}
						avatarOverlayContainerStyle={{backgroundColor: 'white'}}
						title='Twitter'
						subtitle={coin}
						onPress={() => this.showTwitter({coin})}
					/>
					<ListItem
						roundAvatar
						avatar={require('../../img/reddit.png')}
						avatarOverlayContainerStyle={{backgroundColor: 'white'}}
						title='Reddit'
						subtitle={coin}
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

export default Feed;
