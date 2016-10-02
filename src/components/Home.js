import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './home.cssmodule.sass';
import EventNow from './event/EventNow';

@cssmodules(styles)
class Home extends React.Component {

  render() {
    return (
      <div>
        <EventNow />
      </div>
    );
  }
}

Home.displayName = 'Home';
Home.propTypes = {};
Home.defaultProps = {};
Home.contextTypes = {
  actions: React.PropTypes.object,
  events: React.PropTypes.object
};

export default Home;
