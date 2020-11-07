import React, { useState } from "react"
import UserList from "../../UserList/UserList"
import classes from "./ChatForm.module.css"
import BackDrop from "../../UI/BackDrop/BackDrop"

export default function ChatForm(props) {
  const [opponent, setOpponent] = useState("")
  const [value, setValue] = useState("")
  const [openForm, setOpenForm] = useState(false)

  const submitHandler = (event) => {
    event.preventDefault()
    if (!opponent) {
      alert("Выберите собеседника!")
    } else if (!value.trim()) {
      alert("Введите название чата!")
    } else {
      props.createChat(value, opponent)
      setValue("")
      setOpenForm(false)
    }
  }

  const setOpponentHandler = (opponent) => {
    setOpponent(opponent)
  }

  const renderForm = () => {
    return (
      <>
        <BackDrop onClick={() => setOpenForm(false)} />
        <div className={classes.Container}>
          <form className={classes.ChatForm}>
            <input
              type="text"
              onChange={(event) => setValue(event.target.value)}
              value={value}
              placeholder="Введите название нового чата"
            />
            {props.error ? (
              <small className={classes.Error}>Error: {props.error}</small>
            ) : null}
          </form>
          <UserList users={props.users} setOpponent={setOpponentHandler} />

          <button onClick={submitHandler}>Создать чат</button>
        </div>
      </>
    )
  }

  return (
    <>
      <button onClick={() => setOpenForm(true)} className={classes.openFormBtn}>
        Новый чат
        <i className="far fa-edit"></i>
      </button>
      {openForm && renderForm()}
    </>
  )
}
