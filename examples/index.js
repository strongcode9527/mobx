import { render } from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observable, observe } from '../src'

const user = observable({
  name: 1,
  job: 'developer',
  names: ['strong', 'name', 'asdfasdf'],
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
    const { user: { names } } = this.props

    setTimeout(() => {
      names.push('add')
    }, 1000)
  }

  render() {
    const { user: { names } } = this.props
    return (
      <div>
        {
          names.map(name => (
            <p>{name}</p>
          ))
        }
      </div>
    )
  }
}


render(<App user={user} />, document.getElementById('root'))
