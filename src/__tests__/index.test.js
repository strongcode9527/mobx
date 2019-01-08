import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
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

function Random() {
  return <div>strong</div>
}

describe('A suite', function() {
  it('should render without throwing an error', function() {
    expect(mount(<Test />).find('.test').length).equal(1);
  });


  test('单元测试，检验修改后内容发生改变', function(){
    
    const wrapper = mount(<Unit user={user}></Unit>)
    console.log(wrapper.find('.test').text())
    expect(wrapper.find('.test').text()).equal('1');

    user.name = 2

    console.log(wrapper.find('.test').text())
    expect(wrapper.find('.test').text()).equal('2');
  });

});