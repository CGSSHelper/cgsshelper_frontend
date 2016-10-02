import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './atapon.cssmodule.sass';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { calcAtapon } from './Calculator';

import UserInfo from './UserInfo';


@cssmodules(styles)
class Atapon extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wasteTime: 0,
      normalLP: 19,
      normalScore: 5,
      useItem: 3,
      eventScore: 5,
      useMulti: 4,
      userInfo: {},
      dialogOpen: false,
      calcResult: {}
    }
  }

  componentWillMount() {
    // prepare something
    let rankLevel = ['D', 'C', 'B', 'A', 'S'];
    let useItem = ['75', '90', '120', '150'];
    let useMulti = ['1x', '2x', '', '4x'];

    this.normalLP = [];
    for(let i=10; i <= 19; i++) {
      this.normalLP.push(<MenuItem value={i} primaryText={i} key={i} />)
    }

    this.normalScore = [];
    for(let i=0; i <= 4; i++) {
      this.normalScore.push(<MenuItem value={i+1} primaryText={rankLevel[i]} key={i} />)
    }

    this.useItem = [];
    for(let i=0; i <= 3; i++) {
      this.useItem.push(<MenuItem value={i} primaryText={useItem[i]} key={i} />)
    }

    this.eventScore = [];
    for(let i=0; i <= 4; i++) {
      this.eventScore.push(<MenuItem value={i+1} primaryText={rankLevel[i]} key={i} />)
    }

    this.useMulti = [];
    for(let i=0; i <= 4; i++) {
      this.useMulti.push(<MenuItem value={i+1} primaryText={useMulti[i]} key={i} />)
    }
  }

  handleChange(name, event, index, value) {
    this.setState(JSON.parse(`{"${name}":${JSON.stringify(value)}}`));
  }

  do_calc() {
    const { nowEvent } = this.context.events;
    let calc_args = Object.assign({}, this.state, {
      restTime: Math.round(((new Date(nowEvent.comm_data.event_end)).getTime() - (new Date()).getTime()) / 1000 ),
      wasteTime: this.state.wasteTime * 300,
      normalLP: this.state.normalLP - 10,
      normalScore: 5 - this.state.normalScore,
      eventScore: 5 - this.state.eventScore,
    });
    delete calc_args.calcResult;
    delete calc_args.dialogOpen;
    let ret = calcAtapon(calc_args);
    this.setState({dialogOpen: true, calcResult: Object.assign({}, ret, {
      restTime: Math.round(((new Date(nowEvent.comm_data.event_end)).getTime() - (new Date()).getTime()) / 1000 ),
    })})
  }

  closeDialog() {
    this.setState({dialogOpen: false})
  }

  render() {
    if (this.state.calcResult) {
      this.dialog = (
        <Dialog title="Result" actions={<FlatButton label="close" primary={true} onTouchTap={this.closeDialog.bind(this)} />}
                modal={true} open={this.state.dialogOpen}
        >
          <p>Final Event Point: {this.state.calcResult.hasPT} </p>
          <p>Final Level: {this.state.calcResult.Lv}</p>
          <p>Final Exp: {this.state.calcResult.Exp} / {this.state.calcResult.totalExp}</p>
          <p>Game Duration (Total): {this.state.calcResult.totalTime}</p>
          <p>Remaining Time (Second): {this.state.calcResult.restTime}</p>
          <p>Normal Game (Times): {this.state.calcResult.normalTimes}</p>
          <p>Event Game (Times): {this.state.calcResult.eventTimes}</p>
          <p>Use Gem: {this.state.calcResult.useLC}</p>
          <p>Use Stamina Recover: {this.state.calcResult.useLP}</p>
        </Dialog>
      );
    }
    else {
      this.dialog = (
        <Dialog title="Result" actions={<FlatButton label="close" primary={true} onTouchTap={this.closeDialog.bind(this)} />}
                modal={true} open={this.state.dialogOpen}
        >
          Something goes wrong
        </Dialog>
      );
    }
    return (
      <Card>
        <CardTitle
          title="Event Atapon"
          subtitle="Input your data and calculate your potential!"
        />
        <CardText>
          <TextField style={{'width': '100%'}} hintText='if empty use remaining time of event now' floatingLabelText="Remaining Time" floatingLabelFixed={true}/><br />
          <TextField style={{'width': '100%'}} hintText='per day' floatingLabelText="Unused Stamina" onChange={this.handleChange.bind(this, 'wasteTime')} value={this.state.wasteTime}/><br />
          <SelectField style={{'width': '100%'}} value={this.state.normalLP} floatingLabelText="Normal Game: Stamina Consumption"
                       onChange={this.handleChange.bind(this, 'normalLP')}
          >
            {this.normalLP}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.normalScore} floatingLabelText="Normal Game: Score Rank"
                       onChange={this.handleChange.bind(this, 'normalScore')}
          >
            {this.normalScore}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.useItem} floatingLabelText="Event Game: Item Consumption"
                       onChange={this.handleChange.bind(this, 'useItem')}
          >
            {this.useItem}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.eventScore} floatingLabelText="Event Game: Score Rank"
                       onChange={this.handleChange.bind(this, 'eventScore')}
          >
            {this.eventScore}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.useMulti} floatingLabelText="Event Game: Score Rank"
                       onChange={this.handleChange.bind(this, 'useMulti')}
          >
            {this.useMulti}
          </SelectField>

        </CardText>
        <UserInfo info={this.state.userInfo} parentChange={this.handleChange.bind(this, 'userInfo')} onClick={this.do_calc.bind(this)} />
        <CardActions>
          <FlatButton label="Do calculate!" style={{'width': '100%'}} onClick={this.do_calc.bind(this)} />
        </CardActions>
        {this.dialog}
      </Card>
    );
  }
}

Atapon.displayName = 'CalcAtapon';
Atapon.propTypes = {};
Atapon.defaultProps = {};
Atapon.contextTypes = {
  events: React.PropTypes.object
};

export default Atapon;
