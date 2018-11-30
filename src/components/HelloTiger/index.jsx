import React, { Component } from 'react'

import style from './style'

export default class HelloTiger extends Component {
  render() {
    return (
      <div>
        <p className={style.title}>Hello, Woods, are you a tiger ?</p>
      </div>
    )
  }
}
