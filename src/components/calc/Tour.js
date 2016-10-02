import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './tour.cssmodule.sass';

@cssmodules(styles)
class Tour extends React.Component {

  render() {
    return (
      <div>
        WIP, please check later.
      </div>
    );
  }
}

Tour.displayName = 'CalcTour';
Tour.propTypes = {};
Tour.defaultProps = {};

export default Tour;
