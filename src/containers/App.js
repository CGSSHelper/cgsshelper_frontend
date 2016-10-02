/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  getNow,
  getNowEvent,
  addEvent,
  getAllCards,
  addCards,
  filterCards,
  startFetch,
  failedFetch,
  finishFetch
} from '../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/App';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, cards, events, calc} = this.props;
    return (
      <Main
        actions={actions}
        cards={cards}
        events={events}
        calc={calc}/>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  calc: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {
    cards: state.cards,
    events: state.events,
    calc: state.calc
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    getNow,
    getNowEvent,
    addEvent,
    getAllCards,
    addCards,
    filterCards,
    startFetch,
    failedFetch,
    finishFetch
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
