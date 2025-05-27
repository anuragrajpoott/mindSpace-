import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,  // e.g. hotline or article link
  category: String, // e.g. 'hotline', 'article', 'video'
});

export default mongoose.model('SupportResource', resourceSchema);
