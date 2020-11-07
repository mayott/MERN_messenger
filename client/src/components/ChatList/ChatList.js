import React from "react"
import ChatForm from "./ChatForm/ChatForm"
import ChatItem from "./ChatItem/ChatItem"

import classes from "./ChatList.module.css"

export default function ChatList(props) {
  function renderChats() {
    if (props.chats.length) {
      return (
        <ul>
          <ChatItem
            chats={props.chats}
            deleteChat={props.deleteChat}
            editChat={props.editChat}
          />
        </ul>
      )
    } else {
      return <p>У вас пока нет чатов!</p>
    }
  }

  return (
    <div className={classes.ChatList}>
      {props.loading ? (
        <div className={classes.Spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
      {renderChats()}
      <ChatForm
        createChat={props.createChat}
        users={props.users}
        error={props.errorMessage}
      />
    </div>
  )
}
