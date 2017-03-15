import eventApi from '../../api/event';
import * as types from '../mutation-types';

const state = {
  nowEvent: {},
  nextEvent: {},
  eventList: [],
};

const getters = {};

const actions = {
  getNowEvent({ commit }) {
    return eventApi.now().then((res) => {
      commit(types.SET_NOW_EVENT, res);
      return res;
    });
  },
  getNextEvent({ commit }) {
    return eventApi.next().then((res) => {
      commit(types.SET_NEXT_EVENT, res);
      return res;
    });
  },
  getDetail({ commit }, id) {
    return eventApi.detail(id).then((res) => {
      commit(types.ADD_EVENT_DETAIL, res);
      return res;
    });
  },
};

const mutations = {
  [types.SET_NOW_EVENT](_state, data) {
    _state.nowEvent = data;
  },
  [types.SET_NEXT_EVENT](_state, data) {
    _state.nextEvent = data;
  },
  [types.ADD_EVENT_DETAIL](_state, data) {
    _state.eventList = [..._state.eventList, data];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
