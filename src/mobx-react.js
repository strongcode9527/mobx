import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observe } from './mobx'

const Context = React.createContext({ user: 'strong' })

export function inject(propName) {
  return function decorator(Comp) {
    return function Inject(props) {
      return (
        <Context.Consumer>
          {
            value => (
              <Comp {...props} {...{ [propName]: value[propName] }} />
            )
          }
        </Context.Consumer>
      )
    }
  }
}


export function Provider({ children, ...props }) {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.object.isRequired,
}

// 装饰器
export function observer(target, key, descriptor) {

  if (typeof target !== 'function') {
    throw new Error('第一个参数必须是函数')
  }

  let componentClass = target

  // statelessComponent做特殊处理
  if (
    typeof componentClass === 'function'
    && (!componentClass.prototype || !componentClass.prototype.render) 
    && !componentClass.isReactClass
    && !Component.isPrototypeOf(componentClass)
  ) {
    componentClass = class Com extends Component {
      static displayName = componentClass.name ? `Hoc${componentClass.name}` : 'HocStatelessComponent'
    }

    componentClass.prototype.render = target
  }

  const prevRender = componentClass.prototype.render


  function newRender() {
    if (!this.MOBX_REGISTER) {
      componentClass.prototype.render = newRender
      observe(prevRender.bind(this, this.props), this.forceUpdate.bind(this))
      this.MOBX_REGISTER = true
    }
    return prevRender.call(this, this.props)
  }

  componentClass.prototype.render = newRender


  return componentClass
}
