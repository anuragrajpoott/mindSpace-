import React, { useEffect } from 'react';
import { FcLike, FcComments, FcPortraitMode, FcApproval } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../redux/actions/notificationsActions'; // You’ll create this async thunk
import toast from 'react-hot-toast';

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
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications())
      .unwrap()
      .catch(() => toast.error("Failed to load notifications"));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Notifications</h1>

      <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-4">
        {loading && <p className="text-gray-600 text-center">Loading notifications...</p>}

        {!loading && error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!loading && !error && notifications.length === 0 && (
          <p className="text-gray-600 text-center">No new notifications.</p>
        )}

        {!loading && !error && notifications.map((note) => (
          <div
            key={note._id}
            className="flex items-start gap-3 border-b pb-3 last:border-none"
          >
            <div>{getIcon(note.type)}</div>
            <div className="flex-1">
              <p className="text-gray-800">{note.message}</p>
              <p className="text-sm text-gray-400">{new Date(note.time).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
