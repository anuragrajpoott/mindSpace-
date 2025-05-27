import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FcLike, FcBusinessman } from 'react-icons/fc'
import CreatePostModal from '../components/CreatePostModal'
import { fetchPosts, createPost, likePost } from '../redux/postsSlice'
import toast from 'react-hot-toast'

const Feed = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(state => state.posts)
  const user = useSelector(state => state.auth.user)

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleAddPost = async (content) => {
    try {
      await dispatch(createPost(content)).unwrap()
      toast.success("Post created successfully")
      closeModal()
    } catch (err) {
      toast.error("Failed to create post: " + err.message)
    }
  }

  const handleLikePost = async (postId) => {
    try {
      await dispatch(likePost(postId)).unwrap()
    } catch (err) {
      toast.error("Failed to like post: " + err.message)
    }
  }

  return (
    <div className="flex justify-around min-h-screen p-10 bg-blue-50">

      {/* Trending Sidebar */}
      <div className="h-fit w-[30%] bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-lg font-bold">📈 Trending Now</p>
          <p className="text-sm text-gray-500">Curated by Mind Space + Supporters</p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          {/* You can load trending articles from API or keep static */}
          <div className="bg-blue-100 p-2 rounded">How to manage anxiety in 5 steps</div>
          <div className="bg-blue-100 p-2 rounded">Best breathing exercises for calmness</div>
          <div className="bg-blue-100 p-2 rounded">Community journaling prompts</div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex flex-col gap-6 w-[60%]">
        {/* Post Input Box */}
        <div
          className="bg-white rounded-lg p-6 shadow flex gap-4 items-center cursor-pointer"
          onClick={openModal}
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
        {error && <p className="text-red-600">Error: {error}</p>}

        {/* Posts List */}
        {posts.length === 0 && !loading && <p>No posts found.</p>}

        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                <FcBusinessman />
              </div>
              <p className="font-semibold text-blue-900">@{post.user?.userName || "user"}</p>
            </div>
            <p className="text-gray-800 mb-3">{post.description || post.content}</p>
            <div
              className="text-sm text-gray-500 flex items-center gap-1 cursor-pointer select-none"
              onClick={() => handleLikePost(post._id)}
              title="Like post"
            >
              <FcLike /> {post.likes?.length || 0} likes
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal show={modalOpen} onClose={closeModal} onPost={handleAddPost} />
    </div>
  )
}

export default Feed
