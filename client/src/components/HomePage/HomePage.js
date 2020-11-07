import React from "react"
import classes from "./HomePage.module.css"

import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className={classes.Home}>
      <h2>Добро пожаловать!</h2>
      {!localStorage.getItem("token") ? (
        <>
          <h4>Чтобы получить доступ к чатам, войдите или зарегистрируйтесь.</h4>
          <div className={classes.ButtonContainer}>
            <Link to="/auth">Войти</Link>
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </>
      ) : (
        <>
          <h4>Общайтесь в чатах!</h4>
          <Link to="/chats">Хочу общаться!</Link>
        </>
      )}
    </div>
  )
}
