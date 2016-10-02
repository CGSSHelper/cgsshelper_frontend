import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './calc.cssmodule.sass';

import Paper from 'material-ui/Paper';

import Countdown from 'react-count-down'

@cssmodules(styles)
class Calc extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'calc_1'
    }
  }

  handleTabChange(value) {
    this.setState({value: value})
  };

  render() {
    const { nowEvent } = this.context.events;
    let OPTIONS = { endDate: nowEvent.comm_data ? nowEvent.comm_data.event_end : undefined, prefix: 'until event ends!' }
    return (
      <Paper zDepth={0}>
        <h2>Event Point Calculator</h2>
        <p>Event now: { nowEvent.comm_data ? nowEvent.comm_data.name : "nothing" }</p>
        <Countdown options={OPTIONS} />
        {this.props.children}
      </Paper>
    );
  }
}

Calc.displayName = 'Calc';
Calc.propTypes = {};
Calc.defaultProps = {};
Calc.contextTypes = {
  events: React.PropTypes.object
};

export default Calc;
