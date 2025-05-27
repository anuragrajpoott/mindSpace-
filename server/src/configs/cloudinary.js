// src/configs/cloudinary.js

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
const cdConnect = () => cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // e.g., "your_cloud_name"
  api_key: process.env.CLOUDINARY_API_KEY,         // from your Cloudinary dashboard
  api_secret: process.env.CLOUDINARY_API_SECRET,   // keep this secure
});

module.exports = cdConnect;
