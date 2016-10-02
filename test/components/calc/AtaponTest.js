import React from 'react';
import { shallow } from 'enzyme';
import Atapon from 'components/calc/Atapon.js';

describe('<Atapon />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Atapon />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "atapon-component"', () => {
      expect(component.hasClass('atapon-component')).to.equal(true);
    });
  });
});
