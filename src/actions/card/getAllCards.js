import { GET_ALL_CARDS } from './../const';
import fetch from 'isomorphic-fetch';
import addCards from './addCards';
import startFetch from '../common/startFetch';
import failedFetch from '../common/failedFetch';
import finishFetch from '../common/finishFetch';
let config = require('config');

function action() {
  return (dispatch, getState) => {
    dispatch(startFetch("cards"));
    return fetch(`${config.default.apiAddr}/card/all`)
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        let result = json["result"];
        if(result.length != 0)
          dispatch(addCards(result))
        dispatch(finishFetch("cards"))
      })
      .catch(error => {
        dispatch(failedFetch("cards"))
      })
  }
}

module.exports = action;
