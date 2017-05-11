import React from "react";
import GuessHighLow from "./GuessHighLow";
import { connect } from "react-redux";
import { guessAndDraw, initialise } from "./actions";

const mapStateToProps = (state) => { return state; };

const mapDispatchToProps = (dispatch) => {
  return {
    guessAndDraw: (guessType, deckId) => dispatch(guessAndDraw(guessType, deckId)),
    initialise: () => dispatch(initialise())
  }
};

const GuessHighLowContainer =
  connect(mapStateToProps, mapDispatchToProps)(GuessHighLow);

export default GuessHighLowContainer;
