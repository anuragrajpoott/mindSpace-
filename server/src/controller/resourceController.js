import Resource from '../model/Resource.js';

// Create Resource
export const createResource = async (req, res) => {
  try {
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const resource = await Resource.create({ title, description, url });

    res.status(201).json({ success: true, message: "Resource created successfully", resource });
  } catch (err) {
    res.status(500).json({ success: false, message: "Resource creation failed", err: err.message });
  }
};

// Update Resource
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { title, description, url },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }

    res.status(200).json({ success: true, message: "Resource updated successfully", resource: updatedResource });
  } catch (err) {
    res.status(500).json({ success: false, message: "Resource update failed", err: err.message });
  }
};

// Get All Resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    res.status(200).json({ success: true, message: "Resources fetched successfully", resources });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetching resources failed", err: err.message });
  }
};

// Delete Resource
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }

    res.status(200).json({ success: true, message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Resource deletion failed", err: err.message });
  }
};
