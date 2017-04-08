import eventApi from '@/api/event';
import * as types from '@/store/mutation-types';

const state = {
  nowEvent: { comm_data: {} },
  nextEvent: { comm_data: {} },
  eventList: [],
};

const getters = {
  eventBaseDataList(_state) {
    return _state.eventList.map(elem => ({
      id: elem.id,
      name: elem.name,
      type: elem.type,
    }));
  },
  eventPointDataList(_state, _getters) {
    return _getters.eventBaseDataList.filter(
      elem => ['1', '3', '5'].indexOf(elem.type) !== -1);
  },
};

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
  getEventDetail({ commit }, id) {
    return eventApi.detail(id).then((res) => {
      commit(types.ADD_EVENT_DETAIL, res);
      return res;
    });
  },
  getEventAll({ commit }, id) {
    return eventApi.all(id).then((res) => {
      commit(types.ADD_EVENT_ALL, res);
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
    const foundEvent = _state.eventList.find(elem => elem.id === data.id);
    if (!foundEvent) _state.eventList = [..._state.eventList, data];
    else {
      const foundIdx = _state.eventList.indexOf(foundEvent);
      _state.eventList[foundIdx] = data;
    }
  },
  [types.ADD_EVENT_ALL](_state, data) {
    data.forEach((elem) => {
      const foundEvent = _state.eventList.find(_elem => _elem.id === data.id);
      if (!foundEvent) _state.eventList = [..._state.eventList, elem];
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
