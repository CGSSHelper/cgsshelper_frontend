import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './main.cssmodule.sass';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router';
import NavBar from './NavBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import VerticalAlignTop from 'material-ui/svg-icons/editor/vertical-align-top'
import Scroll from 'react-scroll';

@cssmodules(styles)
class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      drawerActive: false,
    };
    this.scroll = Scroll.animateScroll;
  }

  getChildContext() {
    return {
      router: this.props.router
    }
  }

  componentWillMount() {
    //console.log(this.context);
    this.context.actions.getNowEvent();
  }

  toggleDrawerActive() {
    this.setState({
      drawerActive: !this.state.drawerActive
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{'paddingTop': '73px'}}>
          {this.props.children}
        </div>
        <FloatingActionButton
          style={{'position': 'fixed', 'bottom': '5%', 'right': '5%'}}
          onClick={ () => {
            this.scroll.scrollToTop()
          }}
        >
          <VerticalAlignTop />
        </FloatingActionButton>
      </div>
    );
  }
}

Main.displayName = 'Main';
Main.propTypes = {};
Main.defaultProps = {};
Main.contextTypes = {
  actions: React.PropTypes.object
};
Main.childContextTypes = {
  router: React.PropTypes.object
};

export default withRouter(Main);
