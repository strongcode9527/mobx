import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { observable } from '../src/index'
import { inject, Provider, observer } from '../src/mobx-react'

const user = observable({
  name: 1,
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

  render() {
    const { user: { name } } = this.props
    return (
      <div className="test">
        {name}
      </div>
    )
  }
}

function Test() {
  return (
    <Provider user={user}>
      <Strong />
    </Provider>
  )
}


@observer
class Unit extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user: { name } } = this.props
    return (
      <div className="test">
        {name}
      </div>
    )
  }
}

@observer
class List extends Component {
  render() {
    const { user: { names } } = this.props
    return (
      <div className="test">
        {
          names.map( name => (
            <div className="name" key={name}>
              {name}
            </div>
          ) )
        }
      </div>
    )
  }
}

const StateLess = observer(({ user: { name } }) => (
  <div className="test">
    {name}
  </div>
))

export {
  Unit,
  Test,
  List,
  StateLess,
}
