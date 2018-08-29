import React from 'react'

const Context = React.createContext('light')

export function inject() {

}

export function ovserver() {

}

export const Provider = ({ children, ...props }) => (
  <Context.Provider {...props}>
    {children}
  </Context.Provider>
)
