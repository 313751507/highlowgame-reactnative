/**
 * @param {{lastCard: Object, currentCard: Object, goes: Object[], currentGuess: string, currentResult: string}} state
 * @param {{type: string, guess: string, nextCard: Object}} action
 * @returns {*}
 */
import { HIGHER, LOWER } from "./guesses";
import { API_ERROR, DRAW, GUESS, INITIALISED, IS_INITIALISING, SET_DECK } from "./actions";

const initialState = {
  deckId: null,
  lastCard: null,
  currentCard: null,
  goes: [],
  currentGuess: null,
  currentResult: null,
  isInitialising: false,
  initialised: false
};

export function guessHighLowerApp(state = initialState, action) {
  switch(action.type) {
    case DRAW:
      const result = calculateResult(state.guess, state.currentCard, action.nextCard);

      return Object.assign({}, state, {
        goes: [...state.goes, {
          lastCard: state.currentCard,
          currentCard: action.nextCard,
          guess: state.currentGuess,
          result
        }],
        lastCard: state.currentCard,
        currentCard: action.nextCard,
        currentResult: result
      });
    case INITIALISED:
      return Object.assign({}, state, {
        currentCard: action.firstCard,
        initialised: true,
        isInitialising: false
      });
    case GUESS:
      return Object.assign({}, state, { guess: action.guess });
    case IS_INITIALISING:
      return Object.assign({}, state, { isInitialising: true });
    case SET_DECK:
      return Object.assign({}, state, { deckId: action.deckId });
    case API_ERROR:
      return Object.assign({}, state, { apiError: action.error });
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
