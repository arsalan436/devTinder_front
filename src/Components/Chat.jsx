import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/Socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';

const Chat = () => {
    const {targetUserId} = useParams();
    const [messages,setMessages]  = useState([]);
    const [newchat,setNewchat] = useState("");
    const socketRef = useRef(null);
    const user = useSelector((store)=>store.user);
    const userId = user?._id;


const sendMessage = () => {
  if (!newchat.trim()) return;

  const messageData = {
    firstName: user.firstName,
    userId: user._id,
    targetUserId,
    text: newchat,
    createdAt: new Date().toISOString(),
    photoUrl: user.photoUrl
  };
  if (socketRef.current) {

      socketRef.current.emit("sendMessage", messageData);
      setNewchat("");
  }else {
      if (import.meta.env.MODE !== "production") {
        console.error("Socket not connected yet!");
      }

    }
};


    const [targetUser, setTargetUser] = useState(null);

useEffect(() => {
  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, { withCredentials: true });
      setTargetUser(res.data.data); // assuming your API returns { data: {...} }
    } catch (err) {
      if (import.meta.env.MODE !== "production") {
        console.error("❌ Failed to fetch target user", err.response?.data || err.message);
      }
    }
  };

  fetchTargetUser();
}, [targetUserId]);


  const fetchChats = async()=>{
      try{
          const res =await axios.get(BASE_URL+`/chat/${userId}/${targetUserId}`,{withCredentials:true});

          setMessages(res.data);

      }
      catch(err){
          if (import.meta.env.MODE !== "production") {
            console.error("Error fetching chats:", err.message);
          }

      }
  } 



    useEffect(()=>{
        if(!userId) return;
        const newSocket = createSocketConnection();
        socketRef.current = newSocket;
        // as soon as page loaded
        newSocket.emit("joinChat",{firstName:user.firstName,userId,targetUserId});

        newSocket.on("messageRecieved",(msg)=>{
            setMessages(prev => [...prev, msg]);
            
        })
        
        fetchChats();

        return ()=>{
            newSocket.disconnect();
        }
    },[userId, targetUserId])

return (
  <div className="flex flex-col h-[70vh] border-2 border-blue-700 m-4 rounded-md bg-cyan-50">
    {/* Chat messages area */}
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, idx) => (
        <div key={idx} className={`chat ${msg.userId === user?._id ? 'chat-end' : 'chat-start'}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="profile" src={msg.photoUrl} />
            </div>
          </div>
          <div className="chat-header">
            {msg.firstName}
            <time className="text-xs opacity-50 ml-2">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
          <div className="chat-bubble">{msg.text}</div>
          <div className="chat-footer opacity-50">
            {msg.userId === user?._id ? "Delivered" : "Seen"}
          </div>
        </div>
      ))}
    </div>

    {/* Input bar */}
    <div className="p-3 border-t flex items-center gap-2">
      <input
        type="text"
        value={newchat}
        onChange={(e) => setNewchat(e.target.value)}
        placeholder="Type your message"
        className="input input-primary flex-1"
      />
      <button onClick={sendMessage} className="btn btn-primary">Send</button>
    </div>
  </div>
);


}

export default Chat
