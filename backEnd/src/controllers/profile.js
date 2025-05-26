const User = require("../models/user");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, phoneNo, about, gender, profileImage, dateOfBirth } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    if (email !== undefined) user.email = email;
    if (phoneNo !== undefined) user.phoneNo = phoneNo;
    if (about !== undefined) user.about = about;
    if (gender !== undefined) user.gender = gender;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating profile",
      error: error.message
    });
  }
};
