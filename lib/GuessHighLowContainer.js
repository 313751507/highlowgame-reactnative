import React from "react";
import GuessHighLow from "./GuessHighLow";
import { connect } from "react-redux";
import { apiError, guess, initialise } from "./actions";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    guess: (guessType, deckId) => {
      deckApi(`${deckId}/draw/?count=1`, 'Couldn\'t draw next card')
        .then(json => dispatch(guess(guessType, json.cards[0])))
        .catch(error => dispatch(apiError(error)));
    },
    initialise: () => {
      deckApi("new/shuffle/?deck_count=1", 'Couldn\'t shuffle new deck')
        .then(json => Promise.all([Promise.resolve(json.deck_id), deckApi(`${json.deck_id}/draw/?count=1`)]))
        .then(([deckId, json]) => dispatch(initialise(deckId, json.cards[0])))
        .catch(error => dispatch(apiError(error)));
    }
  }
};

function deckApi(path, error) {
  return fetchJson(`https://deckofcardsapi.com/api/deck/${path}`)
    .then(json => {
      if (!json.success) {
        console.log(json);
        throw new Error(error);
      }
      return json;
    });
}

function fetchJson(url) {
  return fetch(url).then(resp => resp.json());
}

const GuessHighLowContainer =
  connect(mapStateToProps, mapDispatchToProps)(GuessHighLow);

export default GuessHighLowContainer;
