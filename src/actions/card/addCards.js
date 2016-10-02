import { ADD_CARDS } from './../const';

function action(cards) {
  return { type: ADD_CARDS, cards: cards };
}

module.exports = action;
