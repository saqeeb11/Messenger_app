import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join-user", {user: username, room: room});
      setShowChat(true);
    }
    else{
      alert('please enter all the fields below')
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join room</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}

      <footer></footer>
    </div>
  );
}

export default App;
