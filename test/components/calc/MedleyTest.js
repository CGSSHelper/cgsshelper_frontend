import React from 'react';
import { shallow } from 'enzyme';
import Medley from 'components/calc/Medley.js';

describe('<Medley />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Medley />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "medley-component"', () => {
      expect(component.hasClass('medley-component')).to.equal(true);
    });
  });
});
