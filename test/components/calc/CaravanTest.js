import React from 'react';
import { shallow } from 'enzyme';
import Caravan from 'components/calc/Caravan.js';

describe('<Caravan />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Caravan />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "caravan-component"', () => {
      expect(component.hasClass('caravan-component')).to.equal(true);
    });
  });
});
