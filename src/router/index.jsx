import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HelloWorld from 'components/HelloWorld'

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HelloWorld} />
        <Route path='/test' component={HelloWorld} />
        
      </Switch>
    )
  }
}
