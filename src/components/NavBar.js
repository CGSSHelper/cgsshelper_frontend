import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './navbar.cssmodule.sass';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

@cssmodules(styles)
class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open:false};
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleRoute(path) {
    this.context.router.push(path);
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <AppBar
          title="CGSS Helper"
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem leftIcon={<FontIcon className="mdi mdi-github-circle mdi-36px" />} primaryText="GitHub" href="https://www.github.com/" />
            </IconMenu>
          }
          style={{'position': 'fixed', 'width': '100%'}}
        />
        <Drawer docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
          <AppBar title="CGSS Helper" iconStyleLeft={{'display': 'none'}} />
          <List>
            <ListItem primaryText="Home" leftIcon={<FontIcon className="material-icons">home</FontIcon>} onTouchTap={ this.handleRoute.bind(this, "/") } />
            <ListItem primaryText="Point Calc" leftIcon={<FontIcon className="mdi mdi-calculator" />} primaryTogglesNestedList={true}
                      nestedItems={[
                        <ListItem key={1} primaryText="Atapon" onTouchTap={ this.handleRoute.bind(this, "/calc/atapon") } />,
                        <ListItem key={2} primaryText="Caravan" onTouchTap={ this.handleRoute.bind(this, "/calc/caravan") } />,
                        <ListItem key={3} primaryText="Medley" onTouchTap={ this.handleRoute.bind(this, "/calc/medley") } />,
                        <ListItem key={4} primaryText="Party" onTouchTap={ this.handleRoute.bind(this, "/calc/party") } />,
                        <ListItem key={5} primaryText="Parade" onTouchTap={ this.handleRoute.bind(this, "/calc/parade") } />
                      ]}
            />
            <ListItem primaryText="Card" leftIcon={<FontIcon className="mdi mdi-cards" />} primaryTogglesNestedList={true}
                      nestedItems={[
                        <ListItem key={1} primaryText="Card Viewer" onTouchTap={ this.handleRoute.bind(this, "/card/viewer") } />,
                      ]}
            />
            <ListItem primaryText="About" leftIcon={<FontIcon className="mdi mdi-alert-circle" />} onTouchTap={ this.handleRoute.bind(this, "/about") } />
            <Divider />
            <ListItem disabled={true} primaryText="CGSS Helper © 2016." />
          </List>
        </Drawer>
      </div>
    );
  }
}

NavBar.displayName = 'NavBar';
NavBar.propTypes = {};
NavBar.defaultProps = {};
NavBar.contextTypes = {
  router: React.PropTypes.object
};

export default NavBar;
