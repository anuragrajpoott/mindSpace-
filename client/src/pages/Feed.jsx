import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcLike, FcBusinessman } from "react-icons/fc";
import CreatePostModal from "../components/CreatePostModal";
import { setPosts } from "../redux/Slices/postSlice";
import toast from "react-hot-toast";
import {toggleLike} from "../services/operations/likeOperations"

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => {
    if (!loading && !isSubmitting) {
      setModalOpen(true);
    }
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch]);

  // Handle post creation - receives {content, image}
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
      await dispatch(toggleLike(postId))
    } catch (err) {
      toast.error("Failed to like post: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="flex justify-around min-h-screen p-10 bg-blue-50">
      {/* Trending Sidebar */}
      <aside className="h-fit w-[30%] bg-white p-6 rounded-lg shadow">
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
        {/* Post Input Box */}
        <div
          className={`bg-white rounded-lg p-6 shadow flex gap-4 items-center ${
            loading || isSubmitting ? "pointer-events-none opacity-50" : "cursor-pointer"
          }`}
          onClick={loading || isSubmitting ? undefined : openModal}
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

        {/* Loading and error */}
        {loading && <p>Loading posts...</p>}
        {/* {error && <p className="text-red-600">Error: {error}</p>} */}

        {/* Posts List */}
        {posts?.length === 0 && !loading && <p>No posts found.</p>}

        {posts?.map((post) => {
          const isLikedByUser = post.likes?.includes(user?._id);
          return (
            <article
              key={post._id}
              className="bg-white rounded-lg p-6 shadow"
              aria-label={`Post by ${post.user?.userName || "user"}`}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                  <FcBusinessman />
                </div>
                <p className="font-semibold text-blue-900">
                  @{post.user?.userName || "user"}
                </p>
              </div>
              <p className="text-gray-800 mb-3">{post.description || post.content}</p>
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
            </article>
          );
        })}
      </main>

      {/* Create Post Modal */}
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
