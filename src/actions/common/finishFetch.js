import { FINISH_FETCH } from './../const';

function action(target) {
  return { type: FINISH_FETCH, target };
}

module.exports = action;
