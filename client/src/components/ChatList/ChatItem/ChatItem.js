import React from "react"
import { NavLink } from "react-router-dom"

import classes from "./ChatItem.module.css"

export default function ChatItem({ chats, deleteChat, editChat }) {
  return (
    <>
      {chats.map((chat) => (
        <li key={chat._id} className={classes.ChatItem}>
          <NavLink to={"/chats/" + chat._id} activeClassName={classes.active}>
            {chat.title}
          </NavLink>
          <small
            onClick={() => {
              const chatTitle = prompt(
                "Введите новое название чата",
                `${chat.title}`
              )
              editChat(chat._id, chatTitle)
            }}
            className={classes.Edit}
          >
            <i className="fas fa-pencil-alt"></i>
          </small>
          <small
            onClick={() => deleteChat(chat._id)}
            className={classes.Delete}
          >
            <i className="far fa-trash-alt"></i>
          </small>
        </li>
      ))}
    </>
  )
}
