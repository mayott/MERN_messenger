import React, { Component } from "react"

import classes from "./Register.module.css"

export default class Register extends Component {
  state = {
    form: {
      email: "",
      firstName: "",
      lastName: "",
      birthday: "",
      password: "",
      repassword: "",
    },
    errorMessage: "",
    loading: false,
  }

  submitHandler = async (event) => {
    event.preventDefault()
    const url = "http://localhost:5000/api/users/register"

    const data = { ...this.state.form }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const json = await response.json()
      console.log("Status:", response.status, JSON.stringify(json))

      if (response.status < 400) {
        this.props.history.push("/auth")
      } else {
        this.setState({ errorMessage: json.message })
      }
    } catch (error) {
      console.error("Ошибка:", error)
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
      <form className={classes.Register} onSubmit={this.submitHandler}>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" onChange={this.changeHandler} />

        <label htmlFor="firstName">Имя:</label>
        <input id="firstName" type="text" onChange={this.changeHandler} />

        <label htmlFor="lastName">Фамилия:</label>
        <input id="lastName" type="text" onChange={this.changeHandler} />

        <label htmlFor="birthday">Дата рождения:</label>
        <input id="birthday" type="date" onChange={this.changeHandler} />

        <label htmlFor="password">Пароль:</label>
        <input id="password" type="password" onChange={this.changeHandler} />

        <label htmlFor="repassword">Повторите пароль: </label>
        <input id="repassword" type="password" onChange={this.changeHandler} />

        {this.state.errorMessage ? (
          <small className={classes.Error}>
            Error: {this.state.errorMessage}
          </small>
        ) : null}

        <button type="submit">Зарегистрироваться</button>
      </form>
    )
  }
}
