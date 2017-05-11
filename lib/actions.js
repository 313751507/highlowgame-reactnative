export const GUESS = 'GUESS';
export const INITIALISE = 'INITIALISE';
export const API_ERROR = 'API_ERROR';

export function guess(type, nextCard) {
  return {
    type: GUESS,
    guess: type,
    nextCard
  };
}

export function initialise(deckId, firstCard) {
  return {
    type: INITIALISE,
    deckId,
    firstCard
  };
}

export function apiError(error) {
  return {
    type: API_ERROR,
    error
  }
}
