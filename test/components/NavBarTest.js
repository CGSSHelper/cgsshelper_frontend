import React from 'react';
import { shallow } from 'enzyme';
import NavBar from 'components//NavBar.js';

describe('<NavBar />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<NavBar />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "navbar-component"', () => {
      expect(component.hasClass('navbar-component')).to.equal(true);
    });
  });
});
