import React from 'react';
import { shallow } from 'enzyme';
import About from 'components//About.js';

describe('<About />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<About />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "about-component"', () => {
      expect(component.hasClass('about-component')).to.equal(true);
    });
  });
});
