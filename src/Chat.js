import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function Chat({ userId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const stringMoment = `${moment().toISOString()}`;
      const thisMoment = moment(`${stringMoment.slice(0, 23)}-07:00`);
      const modify = `${thisMoment.toISOString()}`;
      const messageData = {
        id: Math.random(),
        ConversationId: userId,
        createdAt: modify,
        Content: currentMessage,
        Chatting: "Nguyen",
        /*  ConversationId: 2,
        author: "Nguyen",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(), */
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.ConversationId === userId) {
        setMessageList((list) => [...list, data]);
      } else {
        return false;
      }
    });
    socket.on('connect', function () { 
      socket.emit("login", { userId: userId });
      socket.on('disconnected', function() {
          socket.emit('Offline',{ userId: userId });

      });

  });
    /* if (socket.connected) {
      socket.emit("login", { userId: userId });
    } else {
      socket.emit("disconnected", { userId: userId });
    } */
    
    
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={"Nguyen" === messageContent.Chatting ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.Content}</p>
                  </div>
                  <div className="message-meta">
                    {/*  <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
