import React, { useState } from 'react';
import { FcLike, FcBusinessman } from 'react-icons/fc';
import CreatePostModal from '../components/CreatePostModal'; // Adjust path if needed

const Feed = () => {
  const [articles, setArticles] = useState([
    "How to manage anxiety in 5 steps",
    "Best breathing exercises for calmness",
    "Community journaling prompts"
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "hopeful_soul",
      content: "Started journaling today. Feels like I can finally hear myself think. 💭",
      likes: 12
    },
    {
      id: 2,
      user: "inner_peace",
      content: "Some days I cry. Some days I laugh. Both are okay. 🌿",
      likes: 25
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Function to add a new post
  const addPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: 'current_user', // You can replace with actual logged-in user data
      content,
      likes: 0
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex justify-around min-h-screen p-10 bg-blue-50">

      {/* Trending Sidebar */}
      <div className="h-fit w-[30%] bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-lg font-bold">📈 Trending Now</p>
          <p className="text-sm text-gray-500">Curated by Mind Space + Supporters</p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          {articles.map((article, i) => (
            <div key={i} className="bg-blue-100 p-2 rounded">
              <p>{article}</p>
            </div>
          ))}
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

        {/* Existing Posts */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                <FcBusinessman />
              </div>
              <p className="font-semibold text-blue-900">@{post.user}</p>
            </div>
            <p className="text-gray-800 mb-3">{post.content}</p>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <FcLike /> {post.likes} likes
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <CreatePostModal show={modalOpen} onClose={closeModal} onPost={addPost} />

    </div>
  );
};

export default Feed;
