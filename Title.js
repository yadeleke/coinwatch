/**
 * Render image title
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const instructions = 'Please select a coin below';

export default class Title extends Component {
  render() {

    const {children} = this.props

    return (
      <View style={styles.container}>
        <Image
          source={require('./img/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.instructions}>
          {children}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    // flex: 1,
    marginTop: 300,
    // marginBottom: 400,
    width: 350,
    height: 100,
    resizeMode: 'contain',
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 5,
  },
});
