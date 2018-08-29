import { render } from 'react-dom'
import React, { Component } from 'react'
import { observable, observe } from '../src'

let count = 1

const user = observable({
  name: 'Strong',
  job: 'developer',
  company: {
    name: 'mifanxing',
    address: 'fengtai',
  },
});


observe(() => console.log(`${user.name} is a ${user.job} in ${user.company.name}`, count++));

// console.log => Bob is a developer
user.name = 'Bob';

// console.log => Bob is a stylist
user.job = 'stylist';

// 修改嵌套json，是否可以触发回调函数
user.company.name = 'jd'

// 赋相同的值，是否会重复调用回调函数
user.company.name = 'jd'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      num: 3,
    }
  }

  render() {
    const { num } = this.state
    return (
      <div>
        {num}
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

function decora(target, key, descriptor) {
  console.log('n deco', target, key, descriptor)
  descriptor.writable = false
  return descriptor
}

@decora
class B {
  a = 3
}

const b = new B()

console.log(b, Component.prototype.forceUpdate)
