import React from 'react';
import { shallow } from 'enzyme';
import Calc from 'components//Calc.js';

describe('<Calc />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Calc />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "calc-component"', () => {
      expect(component.hasClass('calc-component')).to.equal(true);
    });
  });
});
