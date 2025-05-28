import React from "react";

const SupportPosts = ({ posts = [], loading }) => {
  return (
    <section
      className="mb-10 max-w-5xl mx-auto"
      aria-live="polite"
      aria-busy={loading}
      aria-label="Recent Community Posts"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Recent Community Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No recent posts.</p>
      ) : (
        <ul className="space-y-4" role="list">
          {posts.slice(0, 5).map((post) => (
            <li
              key={post._id}
              className="bg-white rounded-lg shadow p-4 whitespace-pre-wrap"
              role="listitem"
            >
              <p className="text-gray-800">{post.content}</p>
              <time
                className="mt-2 text-xs text-gray-400 block"
                dateTime={post.createdAt}
                aria-label={`Posted on ${new Date(post.createdAt).toLocaleString()}`}
              >
                {new Date(post.createdAt).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SupportPosts;
