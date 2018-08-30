import { render } from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observable, observe } from '../src'

const user = observable({
  name: 1,
  job: 'developer',
  company: {
    name: 'mifanxing',
    address: 'fengtai',
  },
});


function decora(target, key, descriptor) {
  const prevRender = target.prototype.render

  function newRender() {
    if (!this.MOBX_REGISTER) {
      observe(this.forceUpdate.bind(this))
    }
    this.MOBX_REGISTER = true
    return prevRender.call(this)
  }

  target.prototype.render = newRender

  return descriptor
}


@decora
class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { user } = this.props

    setInterval(() => {
      user.name += 1
    }, 1000)
  }

  render() {
    const { user: { name } } = this.props
    console.log(user)
    return (
      <div>
        {name}
      </div>
    )
  }
}


render(<App user={user} />, document.getElementById('root'))
