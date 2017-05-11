export const DRAW = 'DRAW';
export const GUESS = 'GUESS';
export const SET_DECK = 'SET_DECK';
export const INITIALISED = 'INITIALISED';
export const IS_INITIALISING = 'IS_INITIALISING';
export const API_ERROR = 'API_ERROR';

export function guessAndDraw(type, deckId) {
  return dispatch => {
    dispatch(guess(type));
    return deckApi(`${deckId}/draw/?count=1`, 'Couldn\'t draw next card')
      .then(json => dispatch(draw(json.cards[0])))
      .catch(error => dispatch(apiError(error)));
  };
}

function draw(nextCard) {
  return {
    type: DRAW,
    nextCard
  }
}

function guess(type) {
  return {
    type: GUESS,
    guess: type
  };
}

function isInitialising() {
  return { type: IS_INITIALISING };
}

export function initialise() {
  return dispatch => {
    dispatch(isInitialising());

    return deckApi("new/shuffle/?deck_count=1", 'Couldn\'t shuffle new deck')
      .then(json => {
        dispatch(setDeck(json.deck_id));
        return deckApi(`${json.deck_id}/draw/?count=1`);
      })
      .then(json => dispatch(initialised(json.cards[0])))
      .catch(error => dispatch(apiError(error)));
  };
}

function setDeck(deckId) {
  return {
    type: SET_DECK,
    deckId
  }
}

function initialised(firstCard) {
  return {
    type: INITIALISED,
    firstCard
  };
}

export function apiError(error) {
  return {
    type: API_ERROR,
    error
  }
}

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
