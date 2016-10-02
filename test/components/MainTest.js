import React from 'react';
import { shallow } from 'enzyme';
import Main from 'components//Main.js';

describe('<Main />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Main />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "main-component"', () => {
      expect(component.hasClass('main-component')).to.equal(true);
    });
  });
});
