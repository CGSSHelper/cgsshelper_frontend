import React from 'react';
import { shallow } from 'enzyme';
import Home from 'components//Home.js';

describe('<Home />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Home />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "home-component"', () => {
      expect(component.hasClass('home-component')).to.equal(true);
    });
  });
});
