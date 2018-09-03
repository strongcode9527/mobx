import React from 'react'

import { observe } from './mobx'

const Context = React.createContext('light')

export function inject(propName) {
  return function Inject(Component) {
    return (
      <Context.Consumer>
        {
          context => (
            <Component {...{ [propName]: context[propName] }} />
          )
        }
      </Context.Consumer>
    )
  }
}


export const Provider = ({ children, ...props }) => (
  <Context.Provider {...props}>
    {children}
  </Context.Provider>
)

// 装饰器
export function observer(target, key, descriptor) {
  const prevRender = target.prototype.render

  function newRender() {
    if (!this.MOBX_REGISTER) {
      target.prototype.render = newRender
      observe(this.forceUpdate.bind(this))
      this.MOBX_REGISTER = true
      return true
    }
    return prevRender.call(this)
  }

  target.prototype.render = newRender

  return descriptor
}
