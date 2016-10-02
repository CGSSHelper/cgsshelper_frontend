import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './cardlist.cssmodule.sass';

import LazyLoad from 'react-lazyload';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
const config = require('config');

@cssmodules(styles)
class CardList extends React.Component {

  getRarity(rarity) {
    switch (rarity) {
      case 1:
        return 'Normal'
      case 2:
        return 'Normal+'
      case 3:
        return 'Rare'
      case 4:
        return 'Rare+'
      case 5:
        return 'Super Rare'
      case 6:
        return 'Super Rare+'
      case 7:
        return 'SSR'
      case 8:
        return 'SSR+'
    }
  }

  render() {
    return (
      <div>
        {this.props.cards.map((elem, index) => {
          return (
            <LazyLoad height={100} key={index}>
              <Card styleName="card" style={{'width': '85%'}}>
                <CardHeader
                  title={elem.name}
                  subtitle={`Rarity: ${this.getRarity(Number(elem.rarity))}`}
                  avatar={config.default.apiAddr + elem.avatar_url}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardMedia expandable={true}>
                  <LazyLoad height={100} key={index}>
                    <img src={config.default.apiAddr + elem.full_url} style={{'width': '100%'}} />
                  </LazyLoad>
                </CardMedia>
                <CardText expandable={true}>
                  <p>Vocal: {elem.vocal_min} / {elem.vocal_max}</p>
                  <p>Dance: {elem.dance_min} / {elem.dance_max}</p>
                  <p>Visual: {elem.visual_min} / {elem.visual_max}</p>
                </CardText>
              </Card>
            </LazyLoad>
          )
        })}
      </div>
    );
  }
}

CardList.displayName = 'CardCardList';
CardList.propTypes = {};
CardList.defaultProps = {};

export default CardList;
