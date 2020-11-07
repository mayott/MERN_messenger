import React, { Component } from "react"
import Header from "../../components/Header/Header"

import classes from "./Layout.module.css"

export default class Layout extends Component {
  render() {
    const timeout = localStorage.getItem("timeout")
    const now = new Date()
    if (now >= timeout) {
      localStorage.clear()
    }
    return (
      <div className={classes.Layout}>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
