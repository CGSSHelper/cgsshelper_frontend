import React from 'react';
import { shallow } from 'enzyme';
import EventNow from 'components/event/EventNow.js';

describe('<EventNow />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<EventNow />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "eventnow-component"', () => {
      expect(component.hasClass('eventnow-component')).to.equal(true);
    });
  });
});
