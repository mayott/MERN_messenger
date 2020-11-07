import React from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import rulocale from "date-fns/locale/ru"
import classes from "./MesageItem.module.css"

export default function MessageItem(props) {
  const user = localStorage.getItem("user").replace(/"/g, "")

  return (
    <>
      {props.messages.map((message) => {
        const cls = [classes.MessageItem]
        const isMe = message.user === user
        if (isMe) {
          cls.push(classes.Me)
        } else {
          cls.push(classes.Opponent)
        }
        const createdAt = new Date(message.createdAt)
        return (
          <li key={message._id} className={cls.join(" ")}>
            {message.text}{" "}
            <small>
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
                locale: rulocale,
              })}
            </small>
          </li>
        )
      })}
    </>
  )
}
