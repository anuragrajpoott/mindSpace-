import React, { useState } from 'react';
import { FcPortraitMode } from "react-icons/fc";

const dummyChats = [
  {
    id: 1,
    name: "Emily",
    lastMessage: "Thanks for the check-in 💙",
    messages: [
      { from: "Emily", text: "Hi, how have you been?", time: "10:00 AM" },
      { from: "Me", text: "A bit rough, but better now. You?", time: "10:03 AM" },
      { from: "Emily", text: "Thanks for the check-in 💙", time: "10:06 AM" },
    ],
  },
  {
    id: 2,
    name: "Group: Anxiety Circle",
    lastMessage: "Let’s do breathing at 9 PM tonight?",
    messages: [
      { from: "Group", text: "Let’s do breathing at 9 PM tonight?", time: "9:00 AM" },
      { from: "Me", text: "I'm in!", time: "9:01 AM" },
    ],
  },
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(dummyChats[0]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      setActiveChat((prev) => ({
        ...prev,
        messages: [...prev.messages, { from: "Me", text: message, time: "Now" }],
      }));
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      
      {/* Chat List */}
      <div className="w-1/3 bg-white p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Inbox</h2>
        {dummyChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-3 rounded-md mb-2 cursor-pointer hover:bg-blue-100 ${
              activeChat.id === chat.id ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveChat(chat)}
          >
            <p className="font-semibold">{chat.name}</p>
            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 p-6 flex flex-col">
        <div className="mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-blue-800">{activeChat.name}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {activeChat.messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-sm px-4 py-2 rounded-lg bg-white shadow-sm">
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-400 text-right">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-2 rounded-md"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
