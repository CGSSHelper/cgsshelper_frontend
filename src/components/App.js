import React from 'react';
import './app.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// custom pages
import Main from './Main';
import Home from './Home';
import Calc from './Calc';
import { Atapon, Caravan, Medley, Party, Tour } from './calc';
import Viewer from './card/Viewer';
import About from './About';

class AppComponent extends React.Component {

  componentWillMount() {
    this.rootRoute = {
      childRoutes: [{
        path: '/',
        component: Main,
        getIndexRoute(pNS, cb) {
          cb(null, {component: Home})
        },
        childRoutes: [
          {
            path: '/calc',
            component: Calc,
            childRoutes: [
              {
                path: '/calc/atapon',
                component: Atapon,
              },
              {
                path: '/calc/caravan',
                component: Caravan,
              },
              {
                path: '/calc/medley',
                component: Medley,
              },
              {
                path: '/calc/party',
                component: Party,
              },
              {
                path: '/calc/parade',
                component: Tour,
              }
            ]
          },
          {
            path: '/card/viewer',
            component: Viewer
          },
          {
            path: '/about',
            component: About,
          }
        ]
      }]
    }
  }

  getChildContext() {
    return {
      actions: this.props.actions,
      events: this.props.events,
      calcs: this.props.calcs,
      cards: this.props.cards
    }
  }

  render() {
    return (
    <MuiThemeProvider>
      <Router history={ hashHistory } routes={this.rootRoute}>
      </Router>
    </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

AppComponent.childContextTypes = {
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  calcs: React.PropTypes.object,
  cards: React.PropTypes.object,
};

export default AppComponent;
