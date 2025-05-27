import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, fetchMessages, sendMessage } from "../redux/actions/messagesActions";
import toast from "react-hot-toast";

const Messages = () => {
  const dispatch = useDispatch();
  const { chats, messages, loading, error } = useSelector((state) => state.messages);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch chats on mount
  useEffect(() => {
    dispatch(fetchChats())
      .unwrap()
      .then((res) => {
        if (res.length > 0) setActiveChatId(res[0]._id);
      })
      .catch(() => toast.error("Failed to load chats"));
  }, [dispatch]);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages(activeChatId)).catch(() => toast.error("Failed to load messages"));
    }
  }, [activeChatId, dispatch]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await dispatch(sendMessage(activeChatId, message)).unwrap();
      setMessage("");
      // Optionally fetch messages again or rely on real-time update
      dispatch(fetchMessages(activeChatId));
    } catch {
      toast.error("Failed to send message");
    }
  };

  const activeChat = chats.find((chat) => chat._id === activeChatId);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Chat List */}
      <aside
        className="w-1/3 bg-white p-4 border-r border-gray-300 overflow-y-auto"
        aria-label="Chat List"
      >
        <h2 className="text-xl font-bold mb-4 text-blue-800">Inbox</h2>

        {loading && !activeChatId && <p>Loading chats...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && chats.length === 0 && <p>No chats available.</p>}

        {chats.map((chat) => (
          <div
            key={chat._id}
            role="button"
            tabIndex={0}
            onClick={() => setActiveChatId(chat._id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActiveChatId(chat._id);
            }}
            className={`p-3 rounded-md mb-2 cursor-pointer hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              activeChatId === chat._id ? "bg-blue-100" : ""
            }`}
            aria-current={activeChatId === chat._id ? "true" : undefined}
          >
            <p className="font-semibold truncate">{chat.name}</p>
            <p className="text-sm text-gray-500 truncate">
              {chat.lastMessage || "No messages yet."}
            </p>
          </div>
        ))}
      </aside>

      {/* Chat Window */}
      <section className="w-2/3 p-6 flex flex-col" aria-label="Chat Window">
        <header className="mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-blue-800">
            {activeChat?.name || "Select a chat"}
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto space-y-4 mb-4" aria-live="polite" aria-relevant="additions">
          {loading && activeChatId && <p>Loading messages...</p>}
          {!loading && messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}

          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}
              aria-label={`${msg.from} says: ${msg.text}`}
            >
              <div className="max-w-sm px-4 py-2 rounded-lg bg-white shadow-sm break-words">
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-400 text-right select-none" aria-hidden="true">
                  {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        <footer className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-2 rounded-md"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            aria-label="Type a message"
            disabled={!activeChatId}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            disabled={loading || !activeChatId || message.trim() === ""}
            aria-label="Send message"
            type="button"
          >
            Send
          </button>
        </footer>
      </section>
    </div>
  );
};

export default Messages;
