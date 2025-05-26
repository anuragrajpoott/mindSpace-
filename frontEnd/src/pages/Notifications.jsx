import React, { useState, useEffect } from 'react';
import { FcLike, FcComments, FcPortraitMode, FcApproval } from 'react-icons/fc';

const dummyNotifications = [
  {
    id: 1,
    type: 'like',
    message: 'Alex liked your post.',
    time: '2h ago',
  },
  {
    id: 2,
    type: 'comment',
    message: 'Jamie commented: "Stay strong 💪"',
    time: '3h ago',
  },
  {
    id: 3,
    type: 'follow',
    message: 'Sam started following you.',
    time: '5h ago',
  },
  {
    id: 4,
    type: 'support',
    message: 'Your support request was approved.',
    time: '1d ago',
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'like': return <FcLike className="text-xl" />;
    case 'comment': return <FcComments className="text-xl" />;
    case 'follow': return <FcPortraitMode className="text-xl" />;
    case 'support': return <FcApproval className="text-xl" />;
    default: return null;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace with real API call later
    setNotifications(dummyNotifications);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Notifications</h1>

      <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-4">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div
              key={note.id}
              className="flex items-start gap-3 border-b pb-3 last:border-none"
            >
              <div>{getIcon(note.type)}</div>
              <div className="flex-1">
                <p className="text-gray-800">{note.message}</p>
                <p className="text-sm text-gray-400">{note.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
