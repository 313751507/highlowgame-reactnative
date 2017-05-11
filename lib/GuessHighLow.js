import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, Image } from "react-native";
import { HIGHER, LOWER } from "./guesses";

export default class GuessHighLow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      card: null,
      lastCard: null,
      guess: null
    };

    if (!this.props.deckId) {
      this.props.initialise();
    }
  }

  renderError() {
    return <Text>{this.props.apiError.toString()}</Text>;
  }

  renderResult() {
    if (!this.props.currentResult) {
      return null;
    }

    return <Text>{this.props.currentResult}</Text>;
  }

  static renderLoading() {
    return <Text>Loading...</Text>;
  }

  render() {
    if (this.props.apiError) {
      return this.renderError();
    }

    if (!this.props.currentCard) {
      return GuessHighLow.renderLoading();
    }

    const secureImage = this.props.currentCard.image.replace(/^http:/, 'https:');

    return (<View style={styles.vertical}>
      <Image source={{ uri: secureImage }} style={styles.card}/>
      <Text>Guess that the next card is:</Text>
      <View style={styles.horizontal}>
        <Button title="Lower" color="#f00" onPress={this.props.guess.bind(null, LOWER, this.props.deckId)}/>
        <Button title="Higher" color="#0f0" onPress={this.props.guess.bind(null, HIGHER, this.props.deckId)}/>
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
  deckId: React.PropTypes.string,
  guess: React.PropTypes.func.isRequired,
  initialise: React.PropTypes.func.isRequired
};