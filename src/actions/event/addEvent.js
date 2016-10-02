import { ADD_EVENT } from './../const';

function action(eventData, isNow = false) {
  return { type: ADD_EVENT, eventData: eventData, isNow: isNow };
}

module.exports = action;
