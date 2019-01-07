import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render, configure } from 'enzyme'
import Test from '../../examples'

configure({ adapter: new Adapter() })



describe('A suite', function() {
  it('should render without throwing an error', function() {

    expect(mount(<Test />).find('.test').length).toBe(1);
  });

  // it('should be selectable by class "foo"', function() {
  //   expect(shallow(<Foo />).is('.foo')).toBe(true);
  // });

  // it('should mount in a full DOM', function() {
  //   expect(mount(<Foo />).find('.foo').length).toBe(1);
  // });

  // it('should render to static HTML', function() {
  //   expect(render(<Foo />).text()).toEqual('Bar');
  // });
});