import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import CoinDetail from '../screens/CoinDetail';

const Navigation = StackNavigator({
    Home: {
        screen: Home
    },
    Details: {
        screen: CoinDetail,
        // navigationOptions: ({ navigation }) => ({
        //     title: `${navigation.state.params.name}`,
        // })
    }
  });

export default Navigation;
