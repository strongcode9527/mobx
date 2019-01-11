import { render } from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observable } from '../src'
import { inject, Provider, observer } from '../src/mobx-react'

const user = observable({
  name: 1,
  job: 'developer',
  names: ['strong', 'name', 'asdfasdf'],
  company: {
    name: 'mifanxing',
    address: 'fengtai',
  },
});

// @inject('user')
// @observer
// class Strong extends Component {
//   static propTypes = {
//     user: PropTypes.object.isRequired,
//   }

//   componentDidMount() {
//     const { user: { names } } = this.props

//     let i = 0

//     setTimeout(() => {
//       names.push(i++)
//     }, 1000)
//   }

//   render() {
//     const { user: { names } } = this.props

//     return (
//       <div className="test">
//         {
//           names.map(name => (
//             <div key={name}>
//               {name}
//             </div>
//           ))
//         }
//       </div>
//     )
//   }
// }

// function App() {
//   return (
//     <Provider user={user}>
//       <Strong />
//     </Provider>
//   )
// }

// @observer
// class Unit extends Component {
//   static propTypes = {
//     user: PropTypes.object.isRequired,
//   }

//   render() {
//     const { user: { name } } = this.props
//     return (
//       <div className="test">
//         {name}
//       </div>
//     )
//   }
// }


const Func = observer(({ user: { name } }) => {
  return (
    <div className="test">
      {name}
    </div>
  )
})

render(<Func user={user} />, document.getElementById('root'))

let i = 0

setInterval(() => {
  user.name = i++
}, 1000)