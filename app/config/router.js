import React from 'react';
import { TabNavigator, StackNavigator} from 'react-navigation';

import Feed from '../screens/Feed';
import CoinDetail from '../screens/CoinDetail';
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
				screen: CoinDetail,
				navigationOptions: {
					tabBarLabel: 'Market Data',
				},
			},
			Social: {
				screen: StackNavigator({
					Feed: {
						screen: Social,
						navigationOptions: {
						},
					},
					Twitter: {
						screen: CoinDetail,
						navigationOptions: {
						},
					},
					Reddit: {
						screen: CoinDetail,
						navigationOptions: {
						},
					},
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

// export const Tabs = TabNavigator({
// 	Feed: {
// 		screen: FeedStack,
// 		navigationOptions: {
// 			tabBarLabel: 'Coins',
// 			tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
// 		},
// 	},
  
// });

// export const SettingsStack = StackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: {
//       title: 'Settings',
//     },
//   },
// });

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
