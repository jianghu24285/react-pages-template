/* 
 * @Desc: monkey的router配置
 * @Author: Eleven 
 * @Date: 2018-11-30 18:18:21 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-12-02 19:26:05
 */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HelloMonkey from 'components/HelloMonkey'

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HelloMonkey} />
        <Route path='/page-a' component={HelloMonkey} />
        
      </Switch>
    )
  }
}
