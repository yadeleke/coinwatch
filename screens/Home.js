/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, Picker, Item, TouchableOpacity, 
         Modal, ListView, Image, Dimensions } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = -1;
const options = [ 'Cancel', 'Bitcoin', 'Iota', 'Litecoin' ];
const title = "Select coin";
const { width, height } = Dimensions .get('window');
const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;


export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      selectedCoin: null
    }
    this.handlePress = this.handlePress.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  showActionSheet() {
    this.ActionSheet.show();
  }

  handlePress = (index) => {
    const {navigate} = this.props.navigation;
    this.setState({
      selectedCoin: options[index]
     })
     navigate('Details', {selectedCoin: this.state.selectedCoin});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainLogoContainer}>
          <Image 
              style={styles.mainLogo}
              source={require('../img/logo.png')}   
              resizeMode={'contain'}   
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={this.showActionSheet}
            style={styles.button}
          >
            <Text style={{color: '#FFF', fontSize: 20}}>Please select a coin</Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  mainLogoContainer: {
    flex : 1,
    justifyContent: 'flex-end'
  },
  mainLogo: {
    width: width,
  },
  buttonContainer: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 10,
}
});
