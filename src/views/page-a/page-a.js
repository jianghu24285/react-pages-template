/* 
 * @Desc: page-a页入口
 * @Author: Eleven 
 * @Date: 2018-11-30 18:43:43 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-12-02 19:44:13
 */

import 'babel-polyfill'
import 'raf/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import registerServiceWorker from '../../registerServiceWorker'

import store from 'store/page-a'
import Router from 'router/page-a'

import { isProd } from 'utils'
import fastclick from 'fastclick'
import vConsole from 'vconsole'

// 页面全局通用样式
import 'assets/style/modules/page-a'

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
