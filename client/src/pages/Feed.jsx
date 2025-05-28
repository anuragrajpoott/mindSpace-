import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcLike, FcBusinessman } from "react-icons/fc";
import CreatePostModal from "../components/CreatePostModal";
import { fetchPosts } from "../services/operations/postOperations";
import { toggleLike } from "../services/operations/likeOperations";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open modal only if not loading or submitting
  const openModal = () => {
    if (!loading && !isSubmitting) setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Load posts on mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Handle creating a new post
  const handleAddPost = async ({ content, image }) => {
    try {
      setIsSubmitting(true);
      await dispatch(setPosts({ content, image })).unwrap();
      toast.success("Post created successfully");
      closeModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Failed to create post: " + (err.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle liking a post
  const handleLikePost = async (postId) => {
    try {
      await dispatch(toggleLike(postId));
    } catch (err) {
      toast.error("Failed to like post: " + (err.message || "Unknown error"));
    }
  };

  // Sort posts by creation date descending
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt || b.time) - new Date(a.createdAt || a.time)
  );

  return (
    <div className="flex justify-around min-h-screen p-10 bg-blue-50">
      {/* Sidebar */}
      <aside
        className="h-fit w-[30%] bg-white p-6 rounded-lg shadow"
        aria-label="Trending topics"
      >
        <div className="mb-4">
          <p className="text-lg font-bold">📈 Trending Now</p>
          <p className="text-sm text-gray-500">Curated by Mind Space + Supporters</p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="bg-blue-100 p-2 rounded">How to manage anxiety in 5 steps</div>
          <div className="bg-blue-100 p-2 rounded">Best breathing exercises for calmness</div>
          <div className="bg-blue-100 p-2 rounded">Community journaling prompts</div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex flex-col gap-6 w-[60%]">
        {/* Post Input */}
        <div
          className={`bg-white rounded-lg p-6 shadow flex gap-4 items-center ${
            loading || isSubmitting ? "pointer-events-none opacity-50" : "cursor-pointer"
          }`}
          onClick={openModal}
          aria-disabled={loading || isSubmitting}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal()}
          aria-label="Create a supportive thought"
        >
          <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
            <FcBusinessman />
          </div>
          <div className="border border-gray-300 w-full rounded-full px-5 py-3 text-gray-500 hover:bg-gray-50">
            Create a supportive thought...
          </div>
        </div>

        {/* Loading & Empty states */}
        {loading && (
          <p role="status" className="text-center text-gray-500 mt-4">
            Loading posts...
          </p>
        )}
        {!loading && sortedPosts?.length === 0 && (
          <p role="alert" className="text-center text-gray-500 mt-4">
            No posts found.
          </p>
        )}

        {/* Post List */}
        <AnimatePresence>
          {sortedPosts?.map((post) => {
            const isLikedByUser = post.likes?.includes(user?._id);
            return (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-6 shadow"
                aria-label={`Post by @${post.user?.userName || "user"}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    <FcBusinessman />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">
                      @{post.user?.userName || "user"}
                    </p>
                    <time
                      className="text-sm text-gray-400"
                      dateTime={post.createdAt}
                      aria-label={`Posted ${dayjs(post.createdAt).fromNow()}`}
                    >
                      {dayjs(post.createdAt).fromNow()}
                    </time>
                  </div>
                </div>

                <p className="text-gray-800 mb-3">{post.description || post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post visual"
                    className="rounded-md mb-3 max-h-64 object-cover"
                    loading="lazy"
                  />
                )}

                <button
                  type="button"
                  className={`text-sm flex items-center gap-1 select-none focus:outline-none ${
                    isLikedByUser ? "text-blue-600 font-semibold" : "text-gray-500"
                  }`}
                  onClick={() => handleLikePost(post._id)}
                  title="Like post"
                  aria-pressed={isLikedByUser}
                >
                  <FcLike /> {post.likes?.length || 0} likes
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </main>

      {/* Modal */}
      <CreatePostModal
        show={modalOpen}
        onClose={closeModal}
        onSubmit={handleAddPost}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Feed;
