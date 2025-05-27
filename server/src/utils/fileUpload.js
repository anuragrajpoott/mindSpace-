const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder = "default_folder", height, quality) => {
  if (!file?.tempFilePath) {
    throw new Error("File or tempFilePath missing");
  }

  const options = {
    folder,
    resource_type: "auto",
  };

  if (height) {
    options.height = height;
    options.crop = "scale"; // maintain aspect ratio, scale height
  }

  if (quality) {
    options.quality = quality;
  }

  console.log("Cloudinary upload options:", options);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
