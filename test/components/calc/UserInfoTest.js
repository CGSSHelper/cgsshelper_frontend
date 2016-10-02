import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from 'components/calc/UserInfo.js';

describe('<UserInfo />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<UserInfo />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "userinfo-component"', () => {
      expect(component.hasClass('userinfo-component')).to.equal(true);
    });
  });
});
