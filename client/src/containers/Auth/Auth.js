import React, { Component } from "react"

import classes from "./Auth.module.css"

export default class Auth extends Component {
  state = {
    form: {
      login: "",
      password: "",
    },
    errorMessage: "",
    loading: false,
  }

  async submitHandler(event) {
    event.preventDefault()
    const data = { ...this.state.form }
    try {
      const response = await fetch("http://localhost:5000/api/users/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const json = await response.json()
      console.log(JSON.stringify(json))

      if (response.status < 400) {
        const authDate = new Date()
        const timeout = authDate.setMilliseconds(2 * 60 * 60 * 1000)

        localStorage.setItem("token", JSON.stringify(json.token))
        localStorage.setItem("user", JSON.stringify(json.user))
        localStorage.setItem("timeout", timeout)

        this.props.history.push("/")
        setTimeout(() => {
          localStorage.removeItem("token")
        }, 7.2e6)
      } else {
        this.setState({ errorMessage: json.message })
      }
    } catch (error) {
      console.log("Ошибка:", error)
    }
  }

  changeHandler = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.id]: event.target.value,
      },
    })
  }

  render() {
    return (
      <form
        onSubmit={(event) => this.submitHandler(event)}
        className={classes.Auth}
      >
        <label htmlFor="login">Логин:</label>
        <input
          id="login"
          type="text"
          onChange={(event) => this.changeHandler(event)}
        />

        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          onChange={(event) => this.changeHandler(event)}
        />
        {this.state.errorMessage ? (
          <small className={classes.Error}>
            Error: {this.state.errorMessage}
          </small>
        ) : null}
        <button type="submit">Войти</button>
      </form>
    )
  }
}
