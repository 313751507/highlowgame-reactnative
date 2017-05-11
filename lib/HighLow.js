import React from "react";
import { AppRegistry } from "react-native";
import HomeScreen from "./HomeScreen";
import { StackNavigator } from "react-navigation";
import PlayScreen from "./PlayScreen";

const HighLow = StackNavigator({
  Home: { screen: HomeScreen },
  Play: { screen: PlayScreen }
});

AppRegistry.registerComponent('highlow', () => HighLow);
