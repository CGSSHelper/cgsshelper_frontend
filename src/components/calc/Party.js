import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './party.cssmodule.sass';

@cssmodules(styles)
class Party extends React.Component {

  render() {
    return (
      <div>
        WIP, please check later.
      </div>
    );
  }
}

Party.displayName = 'CalcParty';
Party.propTypes = {};
Party.defaultProps = {};

export default Party;
