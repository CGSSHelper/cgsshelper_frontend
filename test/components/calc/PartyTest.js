import React from 'react';
import { shallow } from 'enzyme';
import Party from 'components/calc/Party.js';

describe('<Party />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Party />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "party-component"', () => {
      expect(component.hasClass('party-component')).to.equal(true);
    });
  });
});
