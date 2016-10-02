/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_EVENT } from '../actions/const';

const initialState = {
  nowEvent: {},
  allEvents: [],
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
    case ADD_EVENT: {
      if (action.isNow)
        return Object.assign({}, state, {
          isFetching: false,
          nowEvent: action.eventData,
          allEvents: [...state.allEvents, action.eventData["comm_data"]]
        });
      else
        return Object.assign({}, state, {
          isFetching: false,
          allEvents: [...state.allEvents, action.eventData]
        });
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
