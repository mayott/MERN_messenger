import React, { useState, useEffect } from "react"
import classes from "./Header.module.css"

import { NavLink, useHistory, useLocation } from "react-router-dom"

export default function Header(props) {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const history = useHistory()

  const location = useLocation()

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [location])

  const logoutHandler = async (url = "") => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.replace(/"/g, ""),
        },
      })
      localStorage.clear()
      history.push("/auth")
      return await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.Header}>
      <nav className={classes.Navigation}>
        <NavLink to="/" exact>
          <div className={classes.Logo}>
            <i className="fas fa-home"></i>
          </div>
        </NavLink>
        {localStorage.getItem("token") ? (
          <>
            <NavLink to="/chats" activeClassName={classes.Active}>
              Чаты
            </NavLink>
            <NavLink to="/profile" activeClassName={classes.Active}>
              Профиль
            </NavLink>
            <NavLink
              to="/logout"
              className={classes.logout}
              onClick={(event) =>
                logoutHandler("http://localhost:5000/api/users/logout")
              }
            >
              <i className="fas fa-sign-out-alt"></i>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className={classes.register}
              activeClassName={classes.Active}
            >
              Регистрация
            </NavLink>
            <NavLink to="/auth" activeClassName={classes.Active}>
              Вход
            </NavLink>
          </>
        )}
      </nav>
    </div>
  )
}
