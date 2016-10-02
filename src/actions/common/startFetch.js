import { START_FETCH } from './../const';

function action(target) {
  return { type: START_FETCH, target };
}

module.exports = action;
