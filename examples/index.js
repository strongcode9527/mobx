import { observable, observe } from '@nx-js/observer-util';

const user = observable({
  name: 'Strong',
  job: 'developer'
});


observe(() => console.log(`${user.name} is a ${user.job}`));

// console.log => Bob is a developer
user.name = 'Bob';

// console.log => Bob is a stylist
user.job = 'stylist';
