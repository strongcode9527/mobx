import React, {Component} from 'react'

const Context = React.createContext('light')

export function inject() {

}

// 收集依赖
export function observer(component) {
  console.log(component)
}

export const Provider = ({ children, ...props }) => (
  <Context.Provider {...props}>
    {children}
  </Context.Provider>
)
