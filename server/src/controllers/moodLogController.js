import MoodLog from "../models/MoodLog.js";

// ========== CREATE MOOD LOG ==========
export const createMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mood, note, date } = req.body;

    if (!mood) {
      return res.status(400).json({ success: false, message: "Mood is required" });
    }

    const moodLog = new MoodLog({
      user: userId,
      mood,
      note: note || "",
      date: date ? new Date(date) : new Date(),
    });

    await moodLog.save();

    res.status(201).json({ success: true, message: "Mood logged successfully", moodLog });
  } catch (error) {
    console.error("Create Mood Log Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========== GET ALL MOOD LOGS FOR USER ==========
export const getMoodLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    // Build filter with optional date range
    const filter = { user: userId };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const moodLogs = await MoodLog.find(filter).sort({ date: -1 });

    res.status(200).json({ success: true, moodLogs });
  } catch (error) {
    console.error("Get Mood Logs Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========== UPDATE MOOD LOG ==========
export const updateMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const moodLogId = req.params.id;
    const { mood, note, date } = req.body;

    const moodLog = await MoodLog.findById(moodLogId);
    if (!moodLog) {
      return res.status(404).json({ success: false, message: "Mood log not found" });
    }

    if (moodLog.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this mood log" });
    }

    if (mood !== undefined) moodLog.mood = mood;
    if (note !== undefined) moodLog.note = note;
    if (date !== undefined) moodLog.date = new Date(date);

    await moodLog.save();

    res.status(200).json({ success: true, message: "Mood log updated successfully", moodLog });
  } catch (error) {
    console.error("Update Mood Log Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========== DELETE MOOD LOG ==========
export const deleteMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const moodLogId = req.params.id;

    const moodLog = await MoodLog.findById(moodLogId);
    if (!moodLog) {
      return res.status(404).json({ success: false, message: "Mood log not found" });
    }

    if (moodLog.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this mood log" });
    }

    await MoodLog.findByIdAndDelete(moodLogId);

    res.status(200).json({ success: true, message: "Mood log deleted successfully" });
  } catch (error) {
    console.error("Delete Mood Log Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========== (Optional) GET MOOD LOGS STATS ==========
export const getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Aggregate moods count by mood type, for example
    const stats = await MoodLog.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Get Mood Stats Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
