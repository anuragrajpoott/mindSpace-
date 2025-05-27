import React, { useState, useEffect } from "react";

const CreatePostModal = ({ show, onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!show) {
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setSubmitting(false);
    }
  }, [show]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && show) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        alert("Image size should be less than 5MB.");
        e.target.value = null;
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (content.trim() === "") return;
    setSubmitting(true);
    await onSubmit({ content, image: imageFile });
    setSubmitting(false);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-title"
    >
      <div className="bg-white rounded-md p-6 max-w-lg w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-3xl font-bold leading-none hover:text-gray-700 focus:outline-none"
          aria-label="Close Create Post Modal"
        >
          &times;
        </button>

        <h2 id="create-post-title" className="text-xl font-bold mb-4">
          Create New Post
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts or experience..."
          className="w-full border p-3 rounded-md h-32 resize-none focus:outline-blue-500"
          aria-label="Post content"
          autoFocus
        />

        <div className="mt-4">
          <label htmlFor="image-upload" className="block mb-2 font-medium">
            Attach Image (optional):
          </label>
          <input
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            aria-describedby="image-upload-desc"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected preview"
              className="mt-4 rounded-md max-h-48 object-contain"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={content.trim() === "" || submitting}
          className={`mt-6 px-6 py-2 rounded-md text-white ${content.trim() === "" || submitting
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
          aria-disabled={content.trim() === "" || submitting}
        >
          {submitting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
