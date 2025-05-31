import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups } from "../redux/Slices/groupSlice";
import { createGroup, getAllGroups, sendGroupMessages } from "../services/operations/groupOperations";
import { secondsToMilliseconds } from "framer-motion";

const dummyGroups = [
  {
    _id: "g1",
    name: "Mental Health Support",
    description: "A safe space to share and listen.",
    membersCount: 25,
  },
  {
    _id: "g2",
    name: "Daily Motivation",
    description: "Positive vibes and encouragement every day.",
    membersCount: 40,
  },
  {
    _id: "g3",
    name: "Mindfulness",
    description: "Practicing mindfulness together.",
    membersCount: 18,
  },
];

const Groups = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.groups);
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const [activeGroupId, setActiveGroupId] = useState(null);
  const [messagesByGroup, setMessagesByGroup] = useState({});
  const [inputMessage, setInputMessage] = useState("");

  // New group form states
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [creatingGroup, setCreatingGroup] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Show dummy groups immediately for demo
    dispatch(setGroups(dummyGroups));
    setActiveGroupId(dummyGroups[0]?._id || null);

    // Then fetch actual groups from backend
    const fetchGroups = async () => {
      setLoading(true);
      try {
        dispatch(getAllGroups(token));

        if (groups) {
          setActiveGroupId(groups[0]?._id || null);
        }
      } catch (error) {
        console.error("Failed to load groups:", error);
      }
      setLoading(false);
    };

    fetchGroups();
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesByGroup, activeGroupId]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeGroupId) return;

    const newMsg = {
      _id: Date.now(),
      from: "Me",
      text: inputMessage.trim(),
      time: new Date(),
      groupId: activeGroupId
    };

    setMessagesByGroup((prev) => ({
      ...prev,
      [activeGroupId]: [...(prev[activeGroupId] || []), newMsg],
    }));
   

    dispatch(sendGroupMessages(newMsg,activeGroupId))
    

    setInputMessage("");
  };

  // New: Handle Create Group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    setCreatingGroup(true);

    // Simulate API call and update state
    const newGroup = {
      _id: `g_${Date.now()}`, // unique id
      name: newGroupName.trim(),
      description: newGroupDescription.trim(),
      membersCount: 1,
    };

    // Update Redux store with new group
    dispatch(setGroups([...(groups || []), newGroup]));
    dispatch(createGroup(newGroup));

    // Reset form
    setNewGroupName("");
    setNewGroupDescription("");
    setActiveGroupId(newGroup._id);
    setCreatingGroup(false);
  };


  const activeGroup = groups?.find((g) => g._id === activeGroupId);
  const messages = messagesByGroup[activeGroupId] || [];

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Groups List */}
      <aside
        className="w-1/3 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[80vh]"
        aria-label="Support groups list"
      >
        <h2
          className="text-2xl font-semibold mb-4 text-blue-800"
          aria-live="polite"
          aria-busy={loading}
        >
          Support Groups
        </h2>

        {/* New Group Creation Form */}
        <div className="mb-6 p-4 border rounded bg-blue-50">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Create New Group</h3>
          <input
            type="text"
            placeholder="Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            aria-label="Group name"
          />
          <textarea
            placeholder="Group Description (optional)"
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            rows={3}
            aria-label="Group description"
          />
          <button
            onClick={handleCreateGroup}
            disabled={creatingGroup || !newGroupName.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            type="button"
            aria-label="Create group"
          >
            {creatingGroup ? "Creating..." : "Create Group"}
          </button>
        </div>

        {loading ? (
          <p>Loading groups...</p>
        ) : groups?.length === 0 ? (
          <p>No support groups available yet.</p>
        ) : (
          <ul role="list" className="space-y-3">
            {groups?.map((group,index) => (
              <li
                key={index}
                role="listitem"
                tabIndex={0}
                onClick={() => setActiveGroupId(group._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveGroupId(group._id);
                }}
                className={`p-4 rounded cursor-pointer hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  activeGroupId === group._id ? "bg-blue-200 font-semibold" : ""
                }`}
                aria-current={activeGroupId === group._id ? "true" : undefined}
              >
                <h3 className="text-lg">{group.name}</h3>
                <p className="text-gray-600">{group?.description || "No description available."}</p>
                <p className="mt-1 text-sm text-gray-500">{group?.members?.length ?? 0} members</p>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Chat Window */}
      <section
        className="w-2/3 ml-6 flex flex-col bg-white rounded-lg shadow p-6 max-h-[80vh]"
        aria-label="Group chat window"
      >
        <header className="mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-blue-800">
            {activeGroup ? activeGroup.name : "Select a group to chat"}
          </h2>
          <p className="text-gray-600">{activeGroup?.description}</p>
        </header>

        <main
          className="flex-1 overflow-y-auto space-y-4 mb-4"
          aria-live="polite"
          aria-relevant="additions"
        >
          {!activeGroup && <p className="text-gray-500">Please select a group to start messaging.</p>}

          {activeGroup && messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}

          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}
              aria-label={`${msg.from} says: ${msg.text}`}
            >
              <div className="max-w-sm px-4 py-2 rounded-lg bg-blue-100 shadow break-words">
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-500 text-right select-none" aria-hidden="true">
                  {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </main>

        <footer className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-2 rounded"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            aria-label="Type a message"
            disabled={!activeGroup}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!activeGroup || inputMessage.trim() === ""}
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

export default Groups;
