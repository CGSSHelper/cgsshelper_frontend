import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './viewer.cssmodule.sass';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import CardList from './CardList';

@cssmodules(styles)
class Viewer extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedCard: -1
    }
  }

  componentWillMount() {
    this.context.actions.getAllCards();
  }

  handleFilter(name, event, index, value) {
    this.context.actions.filterCards(JSON.parse(`{"${name}": ${value}}`))
  }

  selectCard(event, index, value) {
    this.setState({
      selectedCard: value
    })
  }

  render() {
    let { cards, filter } = this.context.cards;
    this.cards = cards.filter(elem => {
      let attr_pass = Number(elem.attribute) === filter.attribute || Number(elem.attribute) === filter.attribute + 1 || 0 === filter.attribute,
        rare_pass = Number(elem.rarity) === filter.rarity || Number(elem.rarity) === filter.rarity + 1 || 0 === filter.rarity,
        card_pass = Number(elem.id) === this.state.selectedCard || -1 === this.state.selectedCard
      return attr_pass && rare_pass && card_pass
    })
    this.selectableCards = cards.filter(elem => {
      let attr_pass = Number(elem.attribute) === filter.attribute || Number(elem.attribute) === filter.attribute + 1 || 0 === filter.attribute,
        rare_pass = Number(elem.rarity) === filter.rarity || Number(elem.rarity) === filter.rarity + 1 || 0 === filter.rarity
      return attr_pass && rare_pass
    })
    return (
      <Paper zDepth={0}>
        <h3>Warning! Please use filter before scroll down or it may cause high data usage.</h3>
        { this.context.cards.isFetching ? <p><CircularProgress />Fetching data...</p> : null }
        <SelectField
          value={this.context.cards.filter.attribute}
          onChange={this.handleFilter.bind(this, "attribute")}
          floatingLabelText="Attribute"
          style={{'width': '100%'}}
        >
          <MenuItem key={1} value={0} primaryText="All" />
          <MenuItem key={2} value={1} primaryText="Cute" />
          <MenuItem key={3} value={2} primaryText="Cool" />
          <MenuItem key={4} value={3} primaryText="Passion" />
        </SelectField>
        <SelectField
          value={this.context.cards.filter.rarity}
          onChange={this.handleFilter.bind(this, "rarity")}
          floatingLabelText="Rarity"
          style={{'width': '100%'}}
        >
          <MenuItem key={1} value={0} primaryText="All" />
          <MenuItem key={2} value={1} primaryText="Normal(+)" />
          <MenuItem key={3} value={3} primaryText="Rare(+)" />
          <MenuItem key={4} value={5} primaryText="Super Rare(+)" />
          <MenuItem key={5} value={7} primaryText="SSR(+)" />
        </SelectField>
        <SelectField
          value={this.state.selectedCard}
          onChange={this.selectCard.bind(this)}
          floatingLabelText="Card"
          style={{'width': '100%'}}
        >
          <MenuItem key={-1} value={-1} primaryText="All" />
          {
            this.selectableCards.map((elem, index) => {
              return <MenuItem key={index} value={Number(elem.id)} primaryText={`${index} ${elem.name}`} />
            })
          }
        </SelectField>
        <CardList cards={(this.cards || this.context.cards.cards)} />
      </Paper>
    );
  }
}

Viewer.displayName = 'CardViewer';
Viewer.propTypes = {};
Viewer.defaultProps = {};
Viewer.contextTypes = {
  actions: React.PropTypes.object,
  cards: React.PropTypes.object
};

export default Viewer;
