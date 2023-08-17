import {useEffect, useState} from 'react'
import './App.css';
import { io } from "socket.io-client";

const socket = io('http://localhost:8000')

const App= () => {

  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  useEffect ( () => {

    socket.on('message_back' + 'room1', msg => {
      setMessageList( prevList => [...prevList, msg] )
    })

  }, [] )


  const sendMessage = () => {
    socket.emit('message', { data: message, roomID: 'room1' })
  }

  return (
    <div className="App">

      <h2>Chat App</h2>
      <ul>
        {messageList.map( msg => <li> {msg.data} </li> ) }
      </ul>
      <input value={message} onChange={event => setMessage(event.target.value)} />
      <button onClick={sendMessage} > Send </button>
      
    </div>
  );
}

export default App;
