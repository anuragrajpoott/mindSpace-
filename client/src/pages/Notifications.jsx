import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../services/operations/notificationOperations";
import toast from "react-hot-toast";
import { FcLike, FcComments, FcPortraitMode, FcApproval } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const iconMap = {
  like: <FcLike className="text-xl" aria-label="Like notification" />,
  comment: <FcComments className="text-xl" aria-label="Comment notification" />,
  follow: <FcPortraitMode className="text-xl" aria-label="Follow notification" />,
  support: <FcApproval className="text-xl" aria-label="Support notification" />,
};

const getIcon = (type) => iconMap[type] || null;

const Notifications = () => {
  const dispatch = useDispatch();

  // Select notifications and loading from Redux store
  const { notifications = [], loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications())
      .unwrap()
      .catch(() => {
        toast.error("Failed to load notifications");
      });
  }, [dispatch]);

  // Sort notifications newest first
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-blue-800" tabIndex={0}>
          Notifications
        </h1>
        {/* Optional Clear All button for future use */}
        {/* <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => dispatch(clearNotifications())}
        >
          Clear All
        </button> */}
      </div>

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
        ) : sortedNotifications.length === 0 ? (
          <p className="text-gray-600 text-center">No new notifications.</p>
        ) : (
          <AnimatePresence>
            {sortedNotifications.map((note) => (
              <motion.article
                key={note._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
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
                    {dayjs(note.time).fromNow()}
                  </time>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default Notifications;
