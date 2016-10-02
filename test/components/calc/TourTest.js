import React from 'react';
import { shallow } from 'enzyme';
import Tour from 'components/calc/Tour.js';

describe('<Tour />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Tour />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "tour-component"', () => {
      expect(component.hasClass('tour-component')).to.equal(true);
    });
  });
});
