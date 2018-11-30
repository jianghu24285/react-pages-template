import React, { Component } from 'react'

import style from './style'

export default class HelloMonkey extends Component {
  render() {
    
    return (
      <div 
        className={style.test}
      >
        Hello, Jim, are you a monkey ?
      </div>
    )
  }
}
