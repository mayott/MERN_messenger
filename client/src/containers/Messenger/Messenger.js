import React, { Component } from "react"
import socketIOClient from "socket.io-client"

import {
  getData,
  postData,
  patchData,
  deleteData,
} from "../../helpers/fetchData"

import ChatList from "../../components/ChatList/ChatList"
import MessageList from "../../components/MessageList/MessageList"
import classes from "./Messenger.module.css"

export default class Messenger extends Component {
  state = {
    chats: [],
    messages: [],
    users: [],
    token: localStorage.getItem("token")
      ? localStorage.getItem("token").replace(/"/g, "")
      : "",
    errorMessage: "",
    loadingChats: false,
    loadingMessages: false,
    socket: socketIOClient("http://localhost:5000"),
  }

  //Получение юзлеров
  getUsers = () => {
    getData("http://localhost:5000/api/users", this.state.token).then(
      (data) => {
        const users = data
        this.setState({ users: [...users] })
      }
    )
  }

  //Получение чатов
  getChats = () => {
    this.setState({ loadingChats: true })
    getData("http://localhost:5000/api/chats", this.state.token).then(
      (data) => {
        this.setState({ loadingChats: false })
        const chats = data
        this.setState({ chats: [...chats] })
      }
    )
  }

  //Получение сообщений
  getMessages = () => {
    const chatId = this.props.match.params.id
    getData(
      `http://localhost:5000/api/chats/getChatMessages/${chatId}`,
      this.state.token
    ).then((data) => {
      const { messages } = data
      this.setState({ messages: [...messages] })
    })
  }

  //Загрузка чатов
  componentDidMount() {
    this.getChats()
    this.getUsers()
    if (this.props.match.params.id) {
      this.getMessages()
    }
  }

  //Загрузка сообщений
  componentDidUpdate(prevProps) {
    const messages = this.state.messages

    this.state.socket.on("getMessage", (message) => {
      this.setState({ messages: [...messages, message] })
    })

    const chats = this.state.chats

    this.state.socket.on("getChat", (chat) => {
      this.setState({ chats: [...chats, chat] })
    })

    this.state.socket.on("getPatchedChat", (data) => {
      this.setState({
        chats: chats.map((chat) => {
          if (chat._id === data.id) {
            chat.title = data.title
          }
          return chat
        }),
      })
    })

    this.state.socket.on("getDeletedChat", (id) => {
      this.setState({
        chats: chats.filter((chat) => chat._id !== id),
      })
    })

    const currentId = this.props.match.params.id
    const prevId = prevProps.match.params.id
    if (currentId !== prevId && currentId) {
      this.getMessages()
    }
  }
  componentWillUnmount() {
    this.state.socket.disconnect()
  }
  //Добавление чата
  createChatHandler = (chatTitle, opponent) => {
    postData(
      "http://localhost:5000/api/chats/createChat",
      {
        title: chatTitle,
        opponent,
      },
      this.state.token
    ).then((res) => {
      const data = res.data
      console.log(res.status)
      if (res.status >= 400) {
        this.setState({ errorMessage: data.message })
      }
      if (res.status < 400) {
        this.state.socket.emit("postChat", data.newChat)
      }
    })
  }

  //Редактирование названия чата
  editChatHandler = (chatId, chatTitle) => {
    patchData(
      `http://localhost:5000/api/chats/${chatId}`,
      {
        title: chatTitle,
      },
      this.state.token
    ).then((data) => {
      this.state.socket.emit("patchChat", { id: data.id, title: chatTitle })
    })
  }

  //Удаление чата
  deleteChatHandler = (chatId) => {
    deleteData(
      `http://localhost:5000/api/chats/${chatId}`,
      this.state.token
    ).then((data) => {
      this.props.history.push("/chats")
      this.state.socket.emit("deleteChat", data.id)
    })
  }

  //Добавление сообщения
  addMessageHandler = (message) => {
    const chatId = this.props.match.params.id
    postData(
      `http://localhost:5000/api/chats/createMessage/${chatId}`,
      {
        message,
      },
      this.state.token
    ).then((res) => {
      const data = res.data
      this.state.socket.emit("postMessage", data.message)
    })
  }

  render() {
    return (
      <div className={classes.Messenger}>
        <p>{this.state.response}</p>
        <ChatList
          chats={this.state.chats}
          users={this.state.users}
          loading={this.state.loadingChats}
          errorMessage={this.state.errorMessage}
          createChat={this.createChatHandler}
          deleteChat={this.deleteChatHandler}
          editChat={this.editChatHandler}
        />
        <MessageList
          messages={this.state.messages}
          loading={this.state.loadingMessages}
          addMessage={this.addMessageHandler}
        />
      </div>
    )
  }
}
