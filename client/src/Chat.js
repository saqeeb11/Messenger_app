import React, { useEffect, useState } from "react";
import scrollToBottom from '../node_modules/react-scroll-to-bottom'

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [joined, setjoined] = useState("");
  const [joinstatus, setjoinstatus] = useState(false);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);

    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("user_joined", (data) => {
      console.log(data)
      setjoined(data.user)
      setjoinstatus(true)
    })
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-container">
      {joinstatus ? <div className="join-alert"><p>{joined} is joined the chat</p>
      <button onClick={() => setjoinstatus(false)}>X</button>
      </div> : ""}
      <div className="chat-body">
    <div className="message-container">
      
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  
                  <p>{messageContent.author} {messageContent.time}</p>
                </div>
              </div>
            </div>
          );
        })}
         </div>
      </div>
      <div className="chat-footer">
        <input
          className="msg-inp"
          type="text"
          placeholder="Message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}

          onKeyPress = {(event)=>{
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="sent-btn" onClick={sendMessage}>send</button>
      </div>
      </div>

    </div>
  );
}

export default Chat;
