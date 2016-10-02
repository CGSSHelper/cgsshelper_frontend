import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './medley.cssmodule.sass';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { calcMedley} from './Calculator';

import UserInfo from './UserInfo';

@cssmodules(styles)
class Medley extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wasteTime: 0,
      medleyLevel: 3,
      encoreLevel: 4,
      encoreScore: 4,
      encoreFail: 0,
      hakoyureLevel: 23,
      userInfo: {},
      dialogOpen: false,
      calcResult: {}
    }
  }

  componentWillMount() {
    // prepare something
    let diffLevel = ['Debut', 'Regular', 'Pro', "Master", 'Master+'];
    let rankLevel = ['D', 'C', 'B', 'A', 'S'];
    let hakoyureLevel = ['0~1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
                          '15', '16', '17', '18', '19', '20', '21~30', '31~40', '41~50', '51~99'];

    this.medleyLevel = [];
    for(let i=0; i <= 3; i++) {
      this.medleyLevel.push(<MenuItem value={i} primaryText={diffLevel[i]} key={i} />)
    }

    this.encoreLevel = [];
    for(let i=0; i <= 4; i++) {
      this.encoreLevel.push(<MenuItem value={i} primaryText={diffLevel[i]} key={i} />)
    }

    this.encoreScore = [];
    for(let i=0; i <= 4; i++) {
      this.encoreScore.push(<MenuItem value={i} primaryText={rankLevel[i]} key={i} />)
    }

    this.hakoyureLevel = [];
    for(let i=0; i < hakoyureLevel.length; i++) {
      this.hakoyureLevel.push(<MenuItem value={i} primaryText={hakoyureLevel[i]} key={i} />)
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
    let ret = calcMedley(calc_args);
    console.log(ret)
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
          <p>Event Game (Times): {this.state.calcResult.medleyTimes}</p>
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
          <SelectField style={{'width': '100%'}} value={this.state.medleyLevel} floatingLabelText="Medley Game: Difficulty Level"
                       onChange={this.handleChange.bind(this, 'medleyLevel')}
          >
            {this.medleyLevel}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.encoreLevel} floatingLabelText="Encore Game: Difficulty Level"
                       onChange={this.handleChange.bind(this, 'encoreLevel')}
          >
            {this.encoreLevel}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.encoreScore} floatingLabelText="Encore Game: Score Rank"
                       onChange={this.handleChange.bind(this, 'encoreScore')}
          >
            {this.encoreScore}
          </SelectField>
          <SelectField style={{'width': '100%'}} value={this.state.hakoyureLevel} floatingLabelText="Whole Game: Hakoyure Level"
                       onChange={this.handleChange.bind(this, 'hakoyureLevel')}
          >
            {this.hakoyureLevel}
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

Medley.displayName = 'CalcMedley';
Medley.propTypes = {};
Medley.defaultProps = {};
Medley.contextTypes = {
  events: React.PropTypes.object
};

export default Medley;
