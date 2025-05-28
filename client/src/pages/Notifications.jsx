import React, { useEffect } from "react";
import { FcLike, FcComments, FcPortraitMode, FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../services/operations/notificationOperations";
import toast from "react-hot-toast";

const getIcon = (type) => {
  switch (type) {
    case "like":
      return <FcLike className="text-xl" aria-label="Like notification" />;
    case "comment":
      return <FcComments className="text-xl" aria-label="Comment notification" />;
    case "follow":
      return <FcPortraitMode className="text-xl" aria-label="Follow notification" />;
    case "support":
      return <FcApproval className="text-xl" aria-label="Support notification" />;
    default:
      return null;
  }
};

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications = [], loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications()).catch(() => {
      toast.error("Failed to load notifications");
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6" tabIndex={0}>
        Notifications
      </h1>

      <section
        className="bg-white rounded-md shadow-md p-4 flex flex-col gap-4 max-w-3xl mx-auto"
        aria-live="polite"
        aria-relevant="additions"
        role="list"
      >
        {loading ? (
          <p className="text-gray-600 text-center" aria-live="assertive">
            Loading notifications...
          </p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-600 text-center">No new notifications.</p>
        ) : (
          notifications.map((note) => (
            <article
              key={note._id}
              className="flex items-start gap-3 border-b pb-3 last:border-none"
              role="listitem"
              aria-label={`${note.type} notification`}
            >
              <div>{getIcon(note.type)}</div>
              <div className="flex-1">
                <p className="text-gray-800">{note.message}</p>
                <time
                  className="text-sm text-gray-400"
                  dateTime={new Date(note.time).toISOString()}
                >
                  {new Date(note.time).toLocaleString()}
                </time>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default Notifications;
