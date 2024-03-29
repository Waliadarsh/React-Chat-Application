import React, { useState } from "react";
import Chat from "./components/Chat";
import './App.css'

import io from 'socket.io-client';
const socket = io.connect("http://localhost:4545")

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowchat(true)
    }
  }

  return (
    <div className="App">
      {!showchat ?
        (<div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="UserName"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={e => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>)
        :
        (<Chat socket={socket} username={username} room={room} />)
      }
    </div>
  );
}

export default App;