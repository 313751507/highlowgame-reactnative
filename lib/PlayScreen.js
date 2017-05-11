import React, { Component } from "react";
import GuessHighLowContainer from "./GuessHighLowContainer";
import { createStore } from 'redux';
import { guessHighLowerApp } from './reducers';
import { Provider } from "react-redux";

const store = createStore(guessHighLowerApp);

export default class PlayScreen extends Component {
  static navigationOptions = {
    title: 'Play',
  };

  render() {
    return (<Provider store={store}>
      <GuessHighLowContainer/>
    </Provider>);
  }
}