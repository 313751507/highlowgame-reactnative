/**
 * @param {{lastCard: Object, currentCard: Object, goes: Object[], currentGuess: string, currentResult: string}} state
 * @param {{type: string, guess: string, nextCard: Object}} action
 * @returns {*}
 */
import { HIGHER, LOWER } from "./guesses";
import { API_ERROR, GUESS, INITIALISE } from "./actions";

const initialState = {
  deckId: null,
  lastCard: null,
  currentCard: null,
  goes: [],
  currentGuess: null,
  currentResult: null
};

export function guessHighLowerApp(state = initialState, action) {
  switch(action.type) {
    case GUESS:
      const result = calculateResult(action.guess, state.currentCard, action.nextCard);

      return Object.assign({}, state, {
        goes: [...state.goes, {
          lastCard: state.currentCard,
          currentCard: action.nextCard,
          guess: action.guess,
          result
        }],
        lastCard: state.currentCard,
        currentCard: action.nextCard,
        currentGuess: action.guess,
        currentResult: result
      });
    case INITIALISE:
      return Object.assign({}, state, {
        deckId: action.deckId,
        currentCard: action.firstCard
      });
    case API_ERROR:
      return Object.assign({}, state, {
        apiError: action.error
      });
    default:
      return state;
  }
}

/**
 * @param {string} guess
 * @param {Object} previousCard
 * @param {Object} nextCard
 * @returns {string}
 */
function calculateResult(guess, previousCard, nextCard) {
  switch (guess) {
    case LOWER:
      return compareCards(previousCard.value, nextCard.value) < 0 ? 'Correct' : 'Wrong!';
    case HIGHER:
      return compareCards(previousCard.value, nextCard.value) > 0 ? 'Correct' : 'Wrong!';
  }
}

/**
 * @param {Object} value1
 * @param {Object} value2
 * @returns {number}
 */
function compareCards(value1, value2) {
  return cardValue(value2) - cardValue(value1);
}

/**
 * @param {string} val
 * @returns {number}
 */
// TODO: Handle parseInt failure — sanitise before getting to this point, side-effects not allowed in here
function cardValue(val) {
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
