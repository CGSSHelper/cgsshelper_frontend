import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './caravan.cssmodule.sass';

@cssmodules(styles)
class Caravan extends React.Component {

  render() {
    return (
      <div>
        WIP, please check later.
      </div>
    );
  }
}

Caravan.displayName = 'CalcCaravan';
Caravan.propTypes = {};
Caravan.defaultProps = {};
Caravan.contextTypes = {
  events: React.PropTypes.object
};

export default Caravan;
