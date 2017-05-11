import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, Image } from "react-native";

export default class GuessHighLow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      card: null,
      lastCard: null,
      guess: null
    }
  }

  _handleLower = () => {
    this.setState({ guess: 'lower' });
    this.dealNext();
  };

  _handleHigher = () => {
    this.setState({ guess: 'higher' });
    this.dealNext();
  };

  dealNext() {
    this._fetcher = fetch(`https://deckofcardsapi.com/api/deck/${this.props.deckId}/draw/?count=1`)
      .then(resp => resp.json())
      .then(json => {
        if (!json.success) {
          throw new Error('Couldn\'t draw next card');
        }
        this.setState({ card: json.cards[0], result: this.calculateResult(json.cards[0]) });
      })
      .catch(error => this.setState({ guess: null, error }));
  }

  calculateResult(nextCard) {
    switch (this.state.guess) {
      case 'lower':
        return GuessHighLow.compareCards(this.state.card.value, nextCard.value) < 0 ? 'Correct' : 'Wrong!';
      case 'higher':
        return GuessHighLow.compareCards(this.state.card.value, nextCard.value) > 0 ? 'Correct' : 'Wrong!';
    }
  }

  static compareCards(value1, value2) {
    return GuessHighLow.cardValue(value2) - GuessHighLow.cardValue(value1);
  }

  static cardValue(val) {
    switch (val) {
      case 'ACE':
        return 14;
      case 'KING':
        return 13;
      case 'QUEEN':
        return 12;
      case 'JACK':
        return 11;
      default:
        return parseInt(val);
    }
  }

  componentWillMount() {
    this._fetcher = fetch(`https://deckofcardsapi.com/api/deck/${this.props.deckId}/draw/?count=1`)
      .then(resp => resp.json())
      .then(json => {
        if (!json.success) {
          throw new Error('Couldn\'t draw next card');
        }
        this.setState({ card: json.cards[0] })
      }).catch(error => this.setState({ error }));
  }

  renderError() {
    return <Text>{this.state.error}</Text>;
  }

  renderResult() {
    if (!this.state.result) {
      return null;
    }

    return <Text>{this.state.result}</Text>;
  }

  static renderLoading() {
    return <Text>Loading...</Text>;
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }

    if (!this.state.card) {
      return GuessHighLow.renderLoading();
    }

    const secureImage = this.state.card.image.replace(/^http:/, 'https:');

    return (<View style={styles.vertical}>
      <Image source={{ uri: secureImage }} style={styles.card}/>
      <Text>Guess that the next card is:</Text>
      <View style={styles.horizontal}>
        <Button title="Lower" color="#f00" onPress={this._handleLower}/>
        <Button title="Higher" color="#0f0" onPress={this._handleHigher}/>
      </View>
      {this.renderResult()}
    </View>);
  }
}

const styles = StyleSheet.create({
  vertical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    width: 226,
    height: 314
  }
});

GuessHighLow.propTypes = {
  deckId: React.PropTypes.string.isRequired
};