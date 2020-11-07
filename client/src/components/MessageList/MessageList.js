import React, { useState } from "react"

import MessageItem from "./MessageItem/MesageItem"
import classes from "./MessageList.module.css"
import { useParams } from "react-router-dom"

export default function MessageList({ messages, addMessage }) {
  const [value, setValue] = useState("")
  const id = useParams().id || null

  const renderMessages = () => {
    if (!id) {
      return <p>Выберите чат слева, или создайте новый!</p>
    } else if (!messages.length) {
      return <p>В этом чате пока нет сообщений!</p>
    } else {
      return (
        <ul>
          <MessageItem messages={messages} />
        </ul>
      )
    }
  }

  return (
    <div className={classes.MessageList}>
      {renderMessages()}
      {useParams().id ? (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            addMessage(value)
            setValue("")
          }}
        >
          <input
            type="text"
            placeholder="Введите текст сообщения"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button>
            <i className="far fa-paper-plane"></i>
          </button>
        </form>
      ) : null}
    </div>
  )
}
