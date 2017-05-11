import React, { Component } from "react";
import GuessHighLowContainer from "./GuessHighLowContainer";
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { guessHighLowerApp } from './reducers';
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";

const logger = createLogger();
const store = createStore(guessHighLowerApp, applyMiddleware(thunkMiddleware, logger));

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