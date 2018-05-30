import {observable, observe} from '../src'

let count = 1

const user = observable({
  name: 'Strong',
  job: 'developer',
  company: {
    name: 'mifanxing',
    address: 'fengtai'
  }
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
