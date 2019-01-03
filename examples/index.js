import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observable } from '../src'
import { inject, Provider, observer } from '../src/mobx-react'

const user = observable({
  name: 'lizhuang',
  job: 'developer',
  names: ['strong', 'name', 'asdfasdf'],
  company: {
    name: 'mifanxing',
    address: 'fengtai',
  },
});

@inject('user')
@observer
class Item extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  handleClick = () => {
    const { user } = this.props
    user.name = 'strong'
  }

  render() {
    const { user: { name } } = this.props

    return (
      <div className="test" onClick={this.handleClick}>
        {name}
      </div>
    )
  }
}


const App = () => (
  <Provider user={user}>
    <Item />
  </Provider>
)


export default App

// render(, document.getElementById('root'))
