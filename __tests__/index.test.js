import React from 'react'
import Adapter from 'enzyme-adapter-react-16'

import { shallow, mount, render, configure } from 'enzyme'

import { observable } from '../src/index'
import { Test, Unit } from '../examples/testDemo'

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

function Random() {
  return <div>strong</div>
}

describe('A suite', function() {
  it('provider提供props ，inject注入数据，能够正常渲染', function() {
    expect(mount(<Test />).find('.test').length).toBe(1);
  });


  test('单元测试，检验修改后内容发生改变', function(){
    
    const wrapper = mount(<Unit user={user}></Unit>)

    expect(wrapper.find('.test').text()).toBe('1');

    user.name = 2

    expect(wrapper.find('.test').text()).toBe('2');
  });

});