import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './about.cssmodule.sass';

@cssmodules(styles)
class About extends React.Component {

  render() {
    return (
      <div className="about-component" styleName="about-component">
        Please edit src/components//About.js to update this component!
      </div>
    );
  }
}

About.displayName = 'About';
About.propTypes = {};
About.defaultProps = {};

export default About;
