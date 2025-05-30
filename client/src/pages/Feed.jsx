import React, { useEffect, useState } from "react";
import { FcLike, FcBusinessman } from "react-icons/fc";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../services/operations/postOperations";
import { setPosts } from "../redux/Slices/postSlice";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state) => state.posts);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {user} = useSelector((state)=>state.user)

  const mockUser = {
    _id: "123",
    userName: "demoUser",
  };

  // Fetch posts on mount
  useEffect(() => {
    dispatch(getAllPosts());

  }, [dispatch]);
console.log(posts)
  // Sidebar trending data state
  const [trending, setTrending] = useState([
    "Loading trending topics...",
  ]);

  // Fetch mental health news without API key
  // useEffect(() => {
  //   async function fetchTrending() {
  //     try {
  //       const res = await fetch(
  //         "https://inshortsapi.vercel.app/news?category=health"
  //       );
  //       const data = await res.json();
  //       if (data.success && data.data) {
  //         // Extract some headlines containing mental health keywords
  //         const filtered = data.data
  //           .filter((item) =>
  //             item.title.toLowerCase().includes("mental")
  //             || item.title.toLowerCase().includes("health")
  //             || item.title.toLowerCase().includes("anxiety")
  //             || item.title.toLowerCase().includes("stress")
  //             || item.title.toLowerCase().includes("depression")
  //           )
  //           .slice(0, 5)
  //           .map((item) => item.title);
  //         setTrending(filtered.length ? filtered : ["No trending mental health news found"]);
  //       } else {
  //         setTrending(["No trending mental health news found"]);
  //       }
  //     } catch (error) {
  //       setTrending(["Failed to fetch trending news"]);
  //     }
  //   }
  //   fetchTrending();
  // }, []);

  const openModal = () => {
    if (!loading && !isSubmitting) setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPreviewImage(null);
  };

  const handleAddPost = async ({ content, image }) => {
    try {
      setIsSubmitting(true);
      const newPost = {
        _id: Date.now().toString(),
        user: user,
        content,
        media:image,
        likes: [],
        createdAt: new Date().toISOString(),
      };
      dispatch(setPosts([newPost, ...posts]));
      dispatch(createPost(newPost, navigate));
      toast.success("Post created");
      closeModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Error creating post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikePost = (postId) => {
    // dispatch(
    //   setPosts(
    //     posts?.map((post) =>
    //       post._id === postId
    //         ? {
    //             ...post,
    //             likes: post?.likes?.includes(user._id)
    //               ? post?.likes?.filter((id) => id !== user._id)
    //               : [...post?.likes, user._id],
    //           }
    //         : post
    //     )
    //   )
    // );
  };

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="flex justify-around min-h-screen p-10 bg-blue-50">
      {/* Sidebar */}
      <aside className="h-fit w-[30%] bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-lg font-bold">📈 Trending Now</p>
          <p className="text-sm text-gray-500">
            Curated by Mind Space + Supporters
          </p>
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
            loading || isSubmitting
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
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

        {/* Loading & Empty */}
        {loading && (
          <p className="text-center text-gray-500 mt-4">Loading posts...</p>
        )}
        {!loading && sortedPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No posts found.</p>
        )}

        {/* Posts */}
        <AnimatePresence>
          {sortedPosts?.map((post) => {
            // const isLikedByUser = post.likes.includes(mockUser._id);
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

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post visual"
                    className="rounded-md mb-3 max-h-64 object-cover"
                  />
                )}

                <button
                  onClick={() => handleLikePost(post._id)}
                  className={`text-sm flex items-center gap-1 select-none ${ "text-gray-500"
                    // isLikedByUser ? "text-blue-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  <FcLike /> {post?.likes?.length} likes
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
                handleAddPost({ content, image: previewImage || "" });
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
              />

              {/* File Input */}
              <div>
                <label
                  htmlFor="fileInput"
                  className="inline-block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition select-none"
                >
                  {previewImage ? "Change Image" : "Upload Image"}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (!file.type.startsWith("image/")) {
                        toast.error("Please upload a valid image file");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = () => setPreviewImage(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-48 rounded-md object-contain mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    aria-label="Remove uploaded image"
                    className="absolute top-1 right-1 rounded-full bg-red-600 text-white w-7 h-7 flex items-center justify-center hover:bg-red-700 transition"
                  >
                    &times;
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    closeModal();
                  }}
                  disabled={isSubmitting}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-md px-5 py-2 text-white ${
                    isSubmitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                  } transition`}
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
