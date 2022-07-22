import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

function App() {
  /* const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }; */
  return (
    <div className="App" style={{display:'flex',justifyContent:'space-evenly'}}>
   
       <div style={{display:'flex',flexDirection:'column'}}>1 <Chat userId = {1}/></div>
       <div style={{display:'flex',flexDirection:'column'}}>2 <Chat userId = {2}/></div>
    
    </div>
  );
}

export default App;
