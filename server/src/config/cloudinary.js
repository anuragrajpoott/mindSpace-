import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File upload utility
export const fileUpload = async (
  file,
  folder = process.env.CLOUD_FOLDER || 'supportify_uploads',
  height = null,
  quality = null
) => {
  try {
    if (!file || !file.tempFilePath) {
      throw new Error('No file or tempFilePath provided');
    }

    const options = {
      folder,
      resource_type: 'auto',
      ...(height && { height, crop: 'scale' }),
      ...(quality && { quality }),
    };

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};
