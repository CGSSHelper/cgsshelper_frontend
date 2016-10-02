import React from 'react';
import { shallow } from 'enzyme';
import Viewer from 'components/card/Viewer.js';

describe('<Viewer />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Viewer />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "viewer-component"', () => {
      expect(component.hasClass('viewer-component')).to.equal(true);
    });
  });
});
