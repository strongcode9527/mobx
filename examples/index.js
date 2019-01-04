import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { render } from 'react-dom'
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
class Strong extends Component {
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

class App extends Component {
  render() {
    return (
      <Provider user={user}>
        <Strong />
      </Provider>
    )
  }
}

render(<App />, document.getElementById('root'))


// export default App
