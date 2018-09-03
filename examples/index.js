import { render } from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observable } from '../src'
import { observer } from '../src/mobx-react'

const user = observable({
  name: 1,
  job: 'developer',
  names: ['strong', 'name', 'asdfasdf'],
  company: {
    name: 'mifanxing',
    address: 'fengtai',
  },
});


@observer
class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // const { user: { names } } = this.props

    // setInterval(() => {
    //   names.push('strong')
    // }, 1000)
  }

  render() {
    const { user: { names } } = this.props
    return (
      <div>
        {
          names.map(name => (
            <p key={name}>
              {name}
            </p>
          ))
        }
      </div>
    )
  }
}


render(<App user={user} />, document.getElementById('root'))
