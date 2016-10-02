/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import finishFetch from '../actions/common/finishFetch.js';
import failedFetch from '../actions/common/failedFetch.js';
import startFetch from '../actions/common/startFetch.js';
import filterCards from '../actions/card/filterCards.js';
import addCards from '../actions/card/addCards.js';
import getAllCards from '../actions/card/getAllCards.js';
import addEvent from '../actions/event/addEvent.js';
import getNowEvent from '../actions/event/getNowEvent.js';
const actions = {
  getNowEvent,
  addEvent,
  getAllCards,
  addCards,
  filterCards,
  startFetch,
  failedFetch,
  finishFetch
};
module.exports = actions;
