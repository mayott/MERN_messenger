import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

import Messenger from "./containers/Messenger/Messenger"
import Profile from "./containers/Profile/Profile"
import HomePage from "./components/HomePage/HomePage"
import Auth from "./containers/Auth/Auth"
import Register from "./containers/Register/Register"
import Layout from "./hoc/Layout/Layout"

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/chats" exact component={Messenger} />
          <Route path="/profile" component={Profile} />
          <Route path="/auth" component={Auth} />
          <Route path="/register" component={Register} />
          <Route path="/chats/:id" component={Messenger} />
        </Switch>
      </Layout>
    )
  }
}
