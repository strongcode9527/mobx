import React from 'react'
import Adapter from 'enzyme-adapter-react-16'

import { shallow, mount, render, configure } from 'enzyme'

import { observable } from '../src/index'
import { Test, Unit, List, StateLess } from '../examples/testDemo'

configure({ adapter: new Adapter() })

describe('A suite', function() {
  it('provider 提供 props ，inject注入数据，能够正常渲染', function() {
    expect(mount(<Test />).find('.test').length).toBe(1);
  });


  it('单元测试，检验修改后内容发生改变', function(){

    const user = observable({
      name: 1,
    });

    const wrapper = mount(<Unit user={user}></Unit>)

    expect(wrapper.find('.test').text()).toBe('1');

    user.name = 2

    expect(wrapper.find('.test').text()).toBe('2');
  });

  it('测试数组数据添加以及删除数据', async () => {

    const user = observable({
      names: ['strong', 'name', 'a'],
    });

    const wrapper = mount(<List user={user} />)

    expect(wrapper.find('.name').length).toBe(3)

    user.names.push('b')
    
    // 当网页更新后，需要手动强制刷新wrapper，正样才能正常测试，真是天坑。。。。。。
    wrapper.update()

    expect(wrapper.find('.name').length).toBe(4)

    user.names.pop()

    wrapper.update()

    expect(wrapper.find('.name').length).toBe(3)
  })

  it('stateless组件测试', function(){

    const user = observable({
      name: 1,
    });

    const wrapper = mount(<StateLess user={user}></StateLess>)

    expect(wrapper.find('.test').text()).toBe('1');

    user.name = 2

    expect(wrapper.find('.test').text()).toBe('2');
  });

});