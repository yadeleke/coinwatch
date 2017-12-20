import React from 'react';
import { TabNavigator, StackNavigator, TabBarTop} from 'react-navigation';
import { Icon } from 'react-native-elements'

import Feed from '../screens/Feed';
import MarketData from '../screens/MarketData';
import CoinInfo from '../screens/CoinInfo';
import Social from '../screens/Social';

const indicatorStyle = (props, alignSelf) => ({
	backgroundColor: props.activeTintColor,
	height: 4,
	alignSelf: 'flex-end',
});

export const FeedStack = StackNavigator({
	Feed: {
		screen: Feed,
		navigationOptions: {
			title: 'Coins',
		},
	},
	Details: {
		screen: TabNavigator({
			MarketData: {
				screen: MarketData,
				navigationOptions: {
					tabBarIcon:
						<Icon
							name='line-chart' 
							type='font-awesome'
							color='white'
						/>
				},
			},
			Information: {
				screen: StackNavigator({
					Learn: {
						screen: CoinInfo,
					},
				}, {
					mode: 'modal',
					headerMode: 'none',
				}),
				navigationOptions: {
					tabBarIcon:
						<Icon
							name='info-circle' 
							type='font-awesome'
							color='white'
						/>
				},
			},
			News: {
				screen: StackNavigator({
					Twitter: {
						screen: Social,
					},
					Reddit: {
						screen: Social,
					},
				}, {
					mode: 'modal',
					headerMode: 'none',
				}),
				navigationOptions: {
					tabBarIcon:
						<Icon
							name='newspaper-o' 
							type='font-awesome'
							color='white'
						/>
				},

			}
		}, 
		{
			tabBarComponent: (props)=> <TabBarTop {...props} indicatorStyle={indicatorStyle(props, 'flex-end')} />,
			swipeEnabled: true,
			tabBarPosition: 'top',
			tabBarOptions: {
				showIcon: true,
				activeTintColor: 'white',
				activeBackgroundColor: '#009374',
				showLabel: false,
				style: {
					backgroundColor: '#24B69C',
				},
				iconStyle: {
					width: 35,
					height: 60
				},
				tabStyle: {
					height: 40
				}
			}
		})
	},
});

export const Root = StackNavigator({
	FeedStack: {
		screen: FeedStack,
	},
}, {
	mode: 'modal',
	headerMode: 'none',
});
