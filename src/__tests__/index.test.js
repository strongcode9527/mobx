import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render, configure } from 'enzyme'
import Test, { Unit } from './Examples'
import { observable } from '../index'

configure({ adapter: new Adapter() })

const user = observable({
  name: 1,
  job: 'developer',
  names: ['strong', 'name', 'asdfasdf'],
  company: {
    name: 'mifanxing',
    address: 'fengtai',
  },
});

describe('A suite', function() {
  it('should render without throwing an error', function() {
    expect(mount(<Test />).find('.test').length).toBe(1);
  });

  it('单元测试，检验修改后内容发生改变', async () => {

    const wrapper = mount(<Unit user={user}/> )

    expect(wrapper.find('.test').getDOMNode().textContent).toBe('1');

    // user.name = 2

    expect(wrapper.find('.test').getDOMNode().textContent).toBe('1');
  });

});