import { FILTER_CARDS } from './../const';

function action(filter) {
  return { type: FILTER_CARDS, filter };
}

module.exports = action;
