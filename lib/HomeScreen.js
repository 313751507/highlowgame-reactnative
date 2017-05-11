import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  _handlePress = () => {
    this.props.navigation.navigate('Play');
  };

  render() {
    return (<TouchableWithoutFeedback onPress={this._handlePress}>
      <View style={styles.vertical}>
        <Image source={require('../img/Card_spade.svg.png')} style={{ width: 300, height: 400 }}/>
        <Text style={styles.welcome}>Welcome to High Low!</Text>
        <Text style={styles.instructions}>Tap to start</Text>
      </View>
    </TouchableWithoutFeedback>);
  }
}

const styles = StyleSheet.create({
  vertical: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    color: '#ff0000',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
