/* 
 * @Desc: tiger的router配置
 * @Author: Eleven 
 * @Date: 2018-11-30 18:18:45 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-11-30 18:19:57
 */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HelloTiger from 'components/HelloTiger'

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HelloTiger} />
        <Route path='/tiger' component={HelloTiger} />
        
      </Switch>
    )
  }
}
