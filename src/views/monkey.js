/* 
 * @Desc: monkey页入口
 * @Author: Eleven 
 * @Date: 2018-11-30 18:43:43 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-11-30 20:29:25
 */

import 'babel-polyfill'
import 'raf/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import registerServiceWorker from '../registerServiceWorker'

import store from 'store/monkey'
import Router from 'router/monkey'

import { isProd } from 'utils'
import fastclick from 'fastclick'
import vConsole from 'vconsole'

// 页面全局通用样式
import 'assets/style/modules/monkey'

// fastclick注册
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    fastclick.attach(document.body)
  }, false)
}

// 非生产环境启用vconsole
if( !isProd ){
  new vConsole()
}

class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <HashRouter>
          <Router />
        </HashRouter>
      </Provider>
    );
  }
}

hot(module)(App)

ReactDOM.render(<App />, document.getElementById('app'))
registerServiceWorker()
