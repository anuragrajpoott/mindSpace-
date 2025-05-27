import React, { useEffect, useState } from 'react';
import { FcPortraitMode } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, fetchMessages, sendMessage } from '../redux/actions/messagesActions'; // You'll create these
import toast from 'react-hot-toast';

const Messages = () => {
  const dispatch = useDispatch();
  const { chats, messages, loading, error } = useSelector(state => state.messages);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => {
        if (res.payload?.length > 0) {
          setActiveChatId(res.payload[0]._id);
          dispatch(fetchMessages(res.payload[0]._id));
        }
      })
      .catch(() => toast.error("Failed to load chats"));
  }, [dispatch]);

  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages(activeChatId));
    }
  }, [activeChatId, dispatch]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await dispatch(sendMessage(activeChatId, message)).unwrap();
      setMessage("");
      dispatch(fetchMessages(activeChatId)); // Refresh messages after sending
    } catch {
      toast.error("Failed to send message");
    }
  };

  const activeChat = chats.find(chat => chat._id === activeChatId);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Chat List */}
      <div className="w-1/3 bg-white p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Inbox</h2>
        {loading && <p>Loading chats...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {chats.map(chat => (
          <div
            key={chat._id}
            className={`p-3 rounded-md mb-2 cursor-pointer hover:bg-blue-100 ${
              activeChatId === chat._id ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveChatId(chat._id)}
          >
            <p className="font-semibold">{chat.name}</p>
            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 p-6 flex flex-col">
        <div className="mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-blue-800">{activeChat?.name || "Select a chat"}</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {loading && <p>Loading messages...</p>}
          {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-sm px-4 py-2 rounded-lg bg-white shadow-sm">
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-400 text-right">{new Date(msg.time).toLocaleTimeString()}</p>
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
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
