import React, { useState } from 'react';

const CreatePostModal = ({ show, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  if (!show) return null; // Don't render if modal is closed

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    if (content.trim() === '') return;
    onSubmit({ content, image });
    setContent('');
    setImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 max-w-lg w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-3 text-2xl font-bold"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Create New Post</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts or experience..."
          className="w-full border p-3 rounded-md h-32 resize-none"
        />

        <div className="mt-4">
          <label className="block mb-2 font-medium">Attach Image (optional):</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && <img src={image} alt="Preview" className="mt-4 rounded-md max-h-48" />}
        </div>

        <button 
          onClick={handleSubmit} 
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
