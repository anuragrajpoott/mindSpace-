import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentChats, sendMessage } from "../services/operations/messageOperations";
import { setMessage } from "../redux/Slices/messageSlice";
import { fetchMessagesWithUser } from "../services/operations/messageOperations"; // hypothetical fetchMessagesWithUser thunk
import toast from "react-hot-toast";

const Messages = () => {
  const dispatch = useDispatch();

  // Select chats state and loading flag
  const { recentChats, loading: chatsLoading } = useSelector((state) => state.messages);

  // Select messages state and loading flag
  const { message, loading: messagesLoading } = useSelector((state) => state.messages);

  // Active chat ID and input message text states
  const [activeChatId, setActiveChatId] = useState(null);

  // Ref to scroll to bottom of messages
  const messagesEndRef = useRef(null);

  // Fetch chats on mount
  useEffect(() => {
    dispatch(fetchMessagesWithUser())
      // .unwrap()
      .then((res) => {
        if (res.length > 0) setActiveChatId(res[0]._id);
      })
      .catch(() => toast.error("Failed to load chats"));
  }, [dispatch]);

  // Fetch messages when activeChatId changes
  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchRecentChats({ chatId: activeChatId }))
        // .unwrap()
        .catch(() => toast.error("Failed to load messages"));
    }
  }, [activeChatId, dispatch]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Handler for sending message
  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await dispatch(sendMessage({ chatId: activeChatId, text: message })).unwrap();
      setMessage("");
      // Ideally, your sendMessage thunk should update messages in state,
      // so no need to dispatch fetchRecentChats here again
    } catch {
      toast.error("Failed to send message");
    }
  };

  // Get active chat object for display
  const activeChat = recentChats?.find((chat) => chat._id === activeChatId);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Chat List */}
      <aside
        className="w-1/3 bg-white p-4 border-r border-gray-300 overflow-y-auto"
        aria-label="Chat List"
      >
        <h2 className="text-xl font-bold mb-4 text-blue-800">Inbox</h2>

        {chatsLoading && <p>Loading chats...</p>}
        {!chatsLoading && recentChats?.length === 0 && <p>No chats available.</p>}

        {recentChats?.map((chat) => (
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
              {recentChats.lastMessage || "No messages yet."}
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

        <main
          className="flex-1 overflow-y-auto space-y-4 mb-4"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messagesLoading && activeChatId && <p>Loading messages...</p>}
          {!messagesLoading && activeChatId && messages.length === 0 && (
            <p className="text-gray-500">No messages yet.</p>
          )}
          {!activeChatId && <p className="text-gray-500">Please select a chat to start messaging.</p>}

          {message?.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}
              aria-label={`${msg.from} says: ${msg.text}`}
            >
              <div className="max-w-sm px-4 py-2 rounded-lg bg-white shadow-sm break-words">
                <p className="text-sm">{msg.text}</p>
                <p
                  className="text-xs text-gray-400 text-right select-none"
                  aria-hidden="true"
                >
                  {new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
            disabled={messagesLoading || !activeChatId || message.trim() === ""}
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
