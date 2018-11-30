/* 
 * @Desc: tiger页入口
 * @Author: Eleven 
 * @Date: 2018-11-30 18:44:02 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-11-30 20:29:18
 */

import 'babel-polyfill'
import 'raf/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import registerServiceWorker from '../registerServiceWorker'

import store from 'store/tiger'
import Router from 'router/tiger'

// 页面全局通用样式
import 'assets/style/modules/tiger'

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
