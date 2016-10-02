/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  ADD_CARDS,
  FILTER_CARDS,
  START_FETCH,
  FAILED_FETCH,
  FINISH_FETCH
} from '../actions/const';

const initialState = {
  cards: [],
  filter: {
    attribute: 0,
    rarity: 0,
    sort: 0
  },
  isFetching: false,
  failedFetch: false,
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    /*
    case YOUR_ACTION: {
      // Modify next state depending on the action and return it
      return nextState;
    }
    */
    case ADD_CARDS:
      return Object.assign({}, state, {
        cards: [...state.cards, ...action.cards]
      });
    case FILTER_CARDS:
      return Object.assign({}, state, {
        filter: Object.assign({}, state.filter, action.filter)
      });
    case START_FETCH:
      if (action.target == "cards")
        return Object.assign({}, state, {
          isFetching: true,
          failedFetch: false
        });
      else
        return state;
    case FAILED_FETCH:
      if (action.target == "cards")
        return Object.assign({}, state, {
          isFetching: false,
          failedFetch: true
        });
      else
        return state;
    case FINISH_FETCH:
      if (action.target == "cards")
        return Object.assign({}, state, {
          isFetching: false,
          failedFetch: false
        });
      else
        return state;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
