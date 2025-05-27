import { v2 as cloudinary } from "cloudinary";

/*
 * Uploads a file to Cloudinary.
 * @param {object} file - file object with tempFilePath
 * @param {string} folder - target folder in Cloudinary
 * @param {number} height - optional height to scale image
 * @param {string|number} quality - optional quality setting
 * @returns {Promise<object>} - Cloudinary upload result
 */
export const uploadImageToCloudinary = async (file, folder = "default_folder", height, quality) => {
  if (!file?.tempFilePath) {
    throw new Error("File or tempFilePath missing");
  }

  const options = {
    folder,
    resource_type: "auto",
  };

  if (height) {
    options.height = height;
    options.crop = "scale"; // maintain aspect ratio by scaling height
  }

  if (quality) {
    options.quality = quality;
  }

  console.log("Cloudinary upload options:", options);

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
