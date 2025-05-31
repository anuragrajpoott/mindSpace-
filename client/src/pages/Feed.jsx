import React, { useEffect, useState, useRef } from "react";
import { FcLike, FcBusinessman } from "react-icons/fc";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts, likePost, updatePost } from "../services/operations/postOperations";
import { setPosts } from "../redux/Slices/postSlice";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading, error } = useSelector((state) => state.posts);
  const { user,token } = useSelector((state) => state.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewFile, setpreviewFile] = useState(null);

  const modalRef = useRef(null);

  // Trending sidebar state
  const [trending, setTrending] = useState(["Loading trending topics..."]);

  
  // Fetch all posts on mount
  useEffect(() => {
    dispatch(getAllPosts(token));
  }, [dispatch]);

  // Focus trap for modal accessibility
  useEffect(() => {
    if (modalOpen) {
      modalRef.current?.focus();
    }
  }, [modalOpen]);

  // Open post creation modal if not loading or submitting
  const openModal = () => {
    if (!loading && !isSubmitting) setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setpreviewFile(null);
  };

  // Handle creating a new post
  const handleAddPost = async ({ content, media }) => {
    try {
      setIsSubmitting(true);
      const postData = {
        _id: Date.now().toString(),
        user: {
          _id: user._id,
          userName: user.userName,
        },
        content,
        media: media || "",
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
      };
      // console.log(postData)
      dispatch(setPosts([postData, ...posts])); // optimistic UI
      await dispatch(createPost(postData, navigate)); // backend call
      toast.success("Post created");
      closeModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Error creating post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle like/unlike post
  const handleLikePost = async (postId) => {
    // if (!user?._id) {
    //   toast.error("You must be logged in to like posts.");
    //   return;
    // }

    // // Optimistic UI update
    // const updatedPosts = posts.map((post) => {
    //   if (post._id === postId) {
    //     const isLiked = post.likes.includes(user._id);
    //     return {
    //       ...post,
    //       likes: isLiked
    //         ? post.likes.filter((id) => id !== user._id)
    //         : [...post.likes, user._id],
    //     };
    //   }
    //   return post;
    // });
    // dispatch(updatePost(token,updatedPosts))
    // dispatch(setPosts(updatedPosts));

    // // Call backend to update like
    // try {
    //   await dispatch(likePost(token,postId));
    // } catch (error) {
    //   toast.error("Failed to update like");
    //   // revert UI changes on error
    //   dispatch(setPosts(posts));
    // }
  };

  // Sort posts by newest first
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // console.log(sortedPosts)

  return (
    <div className="flex justify-around min-h-screen p-10 bg-blue-50">
      {/* Sidebar */}
      <aside className="h-fit w-[30%] bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-lg font-bold">📈 Trending Now</p>
          <p className="text-sm text-gray-500">Curated by Mind Space + Supporters</p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          {trending?.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-100 p-2 rounded break-words"
              title={item}
            >
              {item}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex flex-col gap-6 w-[60%]">
        <div
          className={`bg-white rounded-lg p-6 shadow flex gap-4 items-center ${
            loading || isSubmitting ? "pointer-events-none opacity-50" : "cursor-pointer"
          }`}
          onClick={openModal}
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

        {/* Loading & Error & Empty states */}
        {loading && <p className="text-center text-gray-500 mt-4">Loading posts...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {!loading && !error && sortedPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No posts found.</p>
        )}

        {/* Posts */}
        <AnimatePresence>
          {sortedPosts.map((post) => {
            // const isLikedByUser = post.likes.includes(user?._id);
            return (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-6 shadow"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    <FcBusinessman />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">
                      @{post.user?.userName || "user"}
                    </p>
                    <time className="text-sm text-gray-400" dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleString()}
                    </time>
                  </div>
                </div>

                <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.content}</p>

                {post.media && (
                  <img
                    src={post.media}
                    alt="Post visual"
                    className="rounded-md mb-3 max-h-64 object-cover"
                  />
                )}

                <button
                  onClick={() => handleLikePost(post._id)}
                  // className={`text-sm flex items-center gap-1 select-none ${
                  //   isLikedByUser ? "text-blue-600 font-semibold" : "text-gray-500"
                  // }`}
                  // aria-pressed={isLikedByUser}
                  // aria-label={isLikedByUser ? "Unlike post" : "Like post"}
                >
                  <FcLike /> {post.likes.length} likes
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          tabIndex={-1}
          ref={modalRef}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <h2
              id="modal-title"
              className="text-2xl font-semibold text-blue-800 mb-4 text-center"
            >
              Create a Supportive Post
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const content = e.target.content.value.trim();
                if (!content) {
                  toast.error("Content is required");
                  return;
                }
                handleAddPost({ content, media: previewFile || "" });
              }}
              className="flex flex-col gap-5"
            >
              <textarea
                name="content"
                placeholder="What's on your mind?"
                rows={4}
                disabled={isSubmitting}
                className="resize-none w-full rounded-md border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                autoFocus
              />

              {/* File Input */}
              <div>
                <label
                  htmlFor="fileInput"
                  className="inline-block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition select-none"
                >
                  {previewFile ? "Change media" : "Upload media"}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setpreviewFile(url);
                    }
                  }}
                />
                {previewFile && (
                  <div className="mt-3 relative">
                    <img
                      src={previewFile}
                      alt="Preview"
                      className="max-h-40 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setpreviewFile(null)}
                      className="absolute top-1 right-1 rounded-full bg-red-600 text-white p-1 hover:bg-red-700"
                      aria-label="Remove preview media"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
