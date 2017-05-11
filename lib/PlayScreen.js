import React, { Component } from 'react';
import { Text } from "react-native";
import GuessHighLow from "./GuessHighLow";

export default class PlayScreen extends Component {
  static navigationOptions = {
    title: 'Play',
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      deckId: null
    }
  }

  componentWillMount() {
    this._fetcher = fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(resp => resp.json())
      .then(json => {
        if (!json.success) {
          throw new Error('Couldn\'t shuffle new deck');
        }
        this.setState({ deckId: json.deck_id })
      }).catch(error => this.setState({ error }));
  }

  renderError() {
    return <Text>{this.state.error}</Text>;
  }

  static renderLoading() {
    return <Text>Loading...</Text>;
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }

    if (!this.state.deckId) {
      return PlayScreen.renderLoading();
    }

    return <GuessHighLow deckId={this.state.deckId}/>;
  }
}