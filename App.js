/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, Item, Button, Modal, ListView } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Title from './Title';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = -1;
const options = [ 'Cancel', 'Bitcoin', 'Iota', 'Litecoin' ];
const title = "Select coin";

export default class App extends Component<{}> {
  constructor(){
    super();
    this.state = {
      coin: ''
    }
    this.handlePress = this.handlePress.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  showActionSheet() {
    this.ActionSheet.show();
  }

  handlePress(i) {
    this.setState({
      coin: i
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Title/>
        <View style={styles.button}>
          <Button onPress={this.showActionSheet} title="Please select a coin" />
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
