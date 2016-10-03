import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './eventnow.cssmodule.sass';
let config = require('config');

import moment from 'moment';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Countdown from 'react-count-down';
import Paper from 'material-ui/Paper';

@cssmodules(styles)
class EventNow extends React.Component {

  render() {
    const { nowEvent } = this.context.events;
    if (Object.keys(nowEvent).length == 0)
      return (
        <Card styleName="card" style={{'width': '80%'}}>
          <CardTitle
            title="No Event Now!"
            subtitle="Take a good rest"
          />
        </Card>
      );
    else {
      let OPTIONS = { endDate: nowEvent.comm_data.event_end, prefix: 'until event ends!' }
      return (
      <Paper>
        <Card>
          <CardHeader
            title={ nowEvent.comm_data.name }
            subtitle={ <Countdown options={OPTIONS} /> }
          />
          <CardMedia>
            <img src={config.default.apiAddr + nowEvent.comm_data.bg_url} alt=""/>
          </CardMedia>
          <CardText>
            <p>All time are local time!</p>
            <p>Event Type: { nowEvent.comm_data.type }</p>
            <p>Start: { moment(nowEvent.comm_data.event_start).format('LLLL') } </p>
            <p>End: { moment(nowEvent.comm_data.event_end).format('LLLL') } </p>
            <p>Show Result: { moment(nowEvent.comm_data.result_start).format('LLLL') } </p>
            <p>Has Story: { Number(nowEvent.tour["define"].story_flag) ? "Yes" : "No" } // Story Count: {nowEvent.tour["story_detail"].length} </p>
          </CardText>
          <CardActions>
            <FlatButton label="Details" />
            <FlatButton label="Checkout Background" href={ config.default.apiAddr + nowEvent.comm_data.bg_url } />
          </CardActions>
        </Card>
      </Paper>
      )
    }
  }
}

EventNow.displayName = 'EventEventNow';
EventNow.propTypes = {};
EventNow.defaultProps = {};
EventNow.contextTypes = {
  events: React.PropTypes.object
};

export default EventNow;
