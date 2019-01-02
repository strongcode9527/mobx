import React from 'react'
import PropTypes from 'prop-types'

import { observe } from './mobx'

const Context = React.createContext({ user: 'strong' })

export function inject(propName) {
  return function decorator(Component) {
    return function Inject(props) {
      return (
        <Context.Consumer>
          {
            value => (
              <Component {...props} {...{ [propName]: value[propName] }} />
            )
          }
        </Context.Consumer>
      )
    }
  }
}


export const Provider = ({ children, ...props }) => (
  <Context.Provider value={props}>
    {children}
  </Context.Provider>
)

Provider.propTypes = {
  children: PropTypes.object.isRequired,
}

// 装饰器
export function observer(target, key, descriptor) {
  const prevRender = target.prototype.render

  function newRender() {
    if (!this.MOBX_REGISTER) {
      target.prototype.render = newRender
      observe(prevRender.bind(this), this.forceUpdate.bind(this))
      this.MOBX_REGISTER = true
      return ''
    }
    return prevRender.call(this)
  }

  target.prototype.render = newRender

  return descriptor
}
