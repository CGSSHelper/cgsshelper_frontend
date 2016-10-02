import React from 'react';
import { shallow } from 'enzyme';
import CardList from 'components/card/CardList.js';

describe('<CardList />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<CardList />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "cardlist-component"', () => {
      expect(component.hasClass('cardlist-component')).to.equal(true);
    });
  });
});
