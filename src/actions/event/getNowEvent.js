import { GET_NOW_EVENT } from './../const';
import fetch from 'isomorphic-fetch';
import addEvent from './addEvent';
let config = require('config');

function action() {
  return (dispatch, getState) => {
    return fetch(`${config.default.apiAddr}/event/now`)
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        if(json["result"]["comm_data"])
          dispatch(addEvent(json["result"], true))
      })
  }
}

module.exports = action;
