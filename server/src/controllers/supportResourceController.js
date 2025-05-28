import SupportResource from "../models/SupportResource.js";

// ========== CREATE SUPPORT RESOURCE ==========
export const createSupportResource = async (req, res) => {
  try {
    const { title, description, url, category } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: "Title and URL are required" });
    }

    const newResource = new SupportResource({ title, description, url, category });
    await newResource.save();

    res.status(201).json({ success: true, message: "Support resource created", resource: newResource });
  } catch (error) {
    console.error("Create Support Resource Error:", error);
    res.status(500).json({ success: false, message: "Error creating support resource", error: error.message });
  }
};

// ========== GET ALL SUPPORT RESOURCES ==========
export const getAllSupportResources = async (req, res) => {
  try {
    const resources = await SupportResource.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, resources });
  } catch (error) {
    console.error("Fetch Support Resources Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support resources", error: error.message });
  }
};

// ========== GET SUPPORT RESOURCE BY ID ==========
export const getSupportResourceById = async (req, res) => {
  try {
    const resource = await SupportResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: "Support resource not found" });
    }

    res.status(200).json({ success: true, resource });
  } catch (error) {
    console.error("Fetch Support Resource Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support resource", error: error.message });
  }
};

// ========== UPDATE SUPPORT RESOURCE ==========
export const updateSupportResource = async (req, res) => {
  try {
    const { title, description, url, category } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (url !== undefined) updates.url = url;
    if (category !== undefined) updates.category = category;

    const updatedResource = await SupportResource.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ success: false, message: "Support resource not found" });
    }

    res.status(200).json({ success: true, message: "Support resource updated", resource: updatedResource });
  } catch (error) {
    console.error("Update Support Resource Error:", error);
    res.status(500).json({ success: false, message: "Error updating support resource", error: error.message });
  }
};

// ========== DELETE SUPPORT RESOURCE ==========
export const deleteSupportResource = async (req, res) => {
  try {
    const deletedResource = await SupportResource.findByIdAndDelete(req.params.id);

    if (!deletedResource) {
      return res.status(404).json({ success: false, message: "Support resource not found" });
    }

    res.status(200).json({ success: true, message: "Support resource deleted" });
  } catch (error) {
    console.error("Delete Support Resource Error:", error);
    res.status(500).json({ success: false, message: "Error deleting support resource", error: error.message });
  }
};

// ========== GET SUPPORT RESOURCES BY CATEGORY ==========
export const getSupportResourcesByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const resources = await SupportResource.find({ category }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, resources });
  } catch (error) {
    console.error("Fetch Support Resources by Category Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support resources", error: error.message });
  }
};

// ========== SEARCH SUPPORT RESOURCES ==========
export const searchSupportResources = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive search

    const resources = await SupportResource.find({
      $or: [{ title: regex }, { description: regex }, { category: regex }],
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, resources });
  } catch (error) {
    console.error("Search Support Resources Error:", error);
    res.status(500).json({ success: false, message: "Error searching support resources", error: error.message });
  }
};
