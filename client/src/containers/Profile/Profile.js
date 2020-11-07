import React, { Component } from "react"

import { getData } from "../../helpers/fetchData"

import classes from "./Profile.module.css"

export default class Profile extends Component {
  state = {
    userId: localStorage.getItem("user")
      ? localStorage.getItem("user").replace(/"/g, "")
      : "",
    token: localStorage.getItem("token")
      ? localStorage.getItem("token").replace(/"/g, "")
      : "",
  }

  getUser = () => {
    getData(
      ` http://localhost:5000/api/users/${this.state.userId}`,
      this.state.token
    ).then((data) => {
      const { user } = data

      this.setState({ user: { ...user } })
    })
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
    return (
      <div className={classes.Profile}>
        {this.state.user ? (
          <>
            <p>
              <span>Имя:</span> {this.state.user.firstName}
            </p>
            <p>
              <span>Фамилия:</span> {this.state.user.lastName}
            </p>
            <p>
              <span>День рождения: </span>{" "}
              {this.state.user.birthday.split(["T"], 1)}
            </p>
            <p>
              <span>Почта: </span>
              {this.state.user.email}
            </p>
          </>
        ) : null}
      </div>
    )
  }
}
