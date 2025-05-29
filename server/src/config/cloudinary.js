import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const fileUpload = async (
  file,
  folder = process.env.CLOUD_FOLDER,
  height,
  quality
) => {
  if (!file?.tempFilePath) {
    throw new Error("File or tempFilePath missing");
  }

  const options = {
    folder,
    resource_type: "auto",
  };

  if (height) {
    options.height = height;
    options.crop = "scale";
  }

  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
