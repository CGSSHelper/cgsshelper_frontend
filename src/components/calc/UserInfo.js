import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './userinfo.cssmodule.sass';

import TextField from 'material-ui/TextField';
import { CardText } from 'material-ui/Card';

@cssmodules(styles)
class UserInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myLevel: 1,
      myExp: 1,
      hasLP: 0,
      wantEventPt: 1,
      hasEventPt: 0,
      hasItem: 0,
      hasLP30: 0,
      hasLP20: 0,
      hasLP10: 0,
    };
  }

  componentWillMount() {
    this.props.parentChange(null, null, this.state);
  }

  handleChange(name, event, value) {
    let dispatchParent = () => {
      this.props.parentChange(null, null, this.state);
    };
    if (value == '')
      this.setState(JSON.parse(`{"${name}":""}`), dispatchParent);
    else
      this.setState(JSON.parse(`{"${name}":${value}}`), dispatchParent);
  }

  render() {
    return (
      <CardText>
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'myLevel')} floatingLabelText="My Level" value={this.state.myLevel}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'myExp')} hintText="of this Level" floatingLabelText="My Exp" value={this.state.myExp}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'hasLP')} hintText="from now" floatingLabelText="My Remaining Stamina" value={this.state.hasLP}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'wantEventPt')} floatingLabelText="My Target Point" value={this.state.wantEventPt}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'hasEventPt')} floatingLabelText="My Obtained Point" value={this.state.hasEventPt}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'hasItem')} floatingLabelText="My Remaining Items" value={this.state.hasItem}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'hasLP30')} floatingLabelText="Has Stamina Recover 30" value={this.state.hasLP30}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'hasLP20')} floatingLabelText="Has Stamina Recover 20" value={this.state.hasLP20}/><br />
        <TextField style={{'width': '100%'}} onChange={this.handleChange.bind(this, 'hasLP10')} floatingLabelText="Has Stamina Recover 10" value={this.state.hasLP10}/><br />
      </CardText>
    );
  }
}

UserInfo.displayName = 'CalcUserInfo';
UserInfo.propTypes = {};
UserInfo.defaultProps = {};

export default UserInfo;
