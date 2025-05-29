import Resource from '../model/Resource.js';

// Create Resource
export const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, resource });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Resource creation failed' });
  }
};

// Update Resource
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Resource.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, resource: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

// Get All Resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({ success: true, resources });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching resources failed' });
  }
};

// Delete Resource
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Deletion failed' });
  }
};
