import 'babel-polyfill'
import 'raf/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { isProd } from 'utils'
import fastclick from 'fastclick'
import vConsole from 'vconsole'

// fastclick注册
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    fastclick.attach(document.body);
  }, false);
}

// 非生产环境启用vconsole
if( !isProd ){
  new vConsole()
}

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
