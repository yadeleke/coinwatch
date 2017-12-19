import React from 'react';
import { TabNavigator, StackNavigator} from 'react-navigation';

import Feed from '../screens/Feed';
import MarketData from '../screens/MarketData';
import Social from '../screens/Social';

export const FeedStack = StackNavigator({
	Feed: {
		screen: Feed,
		navigationOptions: {
			title: 'Coins',
		},
	},
	Details: {
		screen: TabNavigator({
			Home: {
				screen: MarketData,
				navigationOptions: {
					tabBarLabel: 'Market Data',
				},
			},
			Social: {
				screen: StackNavigator({
					Feed: {
						screen: Social,
						navigationOptions: {
							title: 'Social',
						},
					},
					Twitter: {
						screen: Social,
						navigationOptions: {
						},
					},
					Reddit: {
						screen: Social,
						navigationOptions: {
						},
					},
				}, {
					mode: 'modal',
					headerMode: 'none',
				}),
				navigationOptions: {
					tabBarLabel: 'Social Media',
				},
			},
      
		}, 
		{
			swipeEnabled: true,
			tabBarPosition: 'bottom',
			tabBarOptions: {
				activeTintColor: 'white',
				activeBackgroundColor: '#009374',
				labelStyle: {
					fontSize: 16,
					padding: 10,
					color: 'white'
				},
				style: {
					backgroundColor: '#24B69C',
				},
			}
		})
	},
});

export const Root = StackNavigator({
	// Tabs: {
	//   screen: Tabs,
	// },
	FeedStack: {
		screen: FeedStack,
	},
}, {
	mode: 'modal',
	headerMode: 'none',
});
