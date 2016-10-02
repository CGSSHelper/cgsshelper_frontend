import { FAILED_FETCH } from './../const';

function action(target) {
  return { type: FAILED_FETCH, target };
}

module.exports = action;
