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

@inject('user')
@observer
class Strong extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user: { name } } = this.props
    console.log('old render ')
    return (
      <div className="test">
        {name}
      </div>
    )
  }
}

function App() {
  return (
    <Provider user={user}>
      <Strong />
    </Provider>
  )
}

@observer
class Unit extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user: { name } } = this.props
    return (
      <div className="test">
        {name}
      </div>
    )
  }
}

render(<Unit user={user} />, document.getElementById('root'))

user.name = 2