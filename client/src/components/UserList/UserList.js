import React, { useState } from "react"
import classes from "./UserList.module.css"

export default function UserList(props) {
  const [opponent, setOpponent] = useState("")

  const id = localStorage.getItem("user").replace(/"/g, "")
  const cls = [classes.UserList__item]

  const renderUsers = () => {
    const users = props.users.filter((user) => user._id !== id)
    return users.map((user) => (
      <li
        key={user._id}
        onClick={(event) => {
          props.setOpponent(user._id)
          setOpponent(event.target.innerText)
        }}
        className={cls.join(" ")}
      >
        {user.firstName} {user.lastName}
      </li>
    ))
  }
  return (
    <div className={classes.UserList}>
      {props.users.length ? (
        <ul>
          <span>
            <b>Собеседник:</b>
            &nbsp;{opponent ? opponent : "еще не выбран"}
          </span>
          {renderUsers()}
        </ul>
      ) : (
        "Пользователи не найдены"
      )}
    </div>
  )
}
