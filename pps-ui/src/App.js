import React, { Component } from 'react'
import Header from './components/organisms/header/Header.js'
import HeaderLinks from './components/molecules/HeaderLinks'
export default class App extends Component {
  render() {
    return (
      <div>
        <Header
        absolute
        brand="Retail Application"
        rightLinks={<HeaderLinks/>}
        // {...rest}
      />
      </div>
    )
  }
}
