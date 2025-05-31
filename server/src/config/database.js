import mongoose from 'mongoose';

const dbConnect = async () => {
  const mongoURI = process.env.MONGODB_URL;

  if (!mongoURI) {
    console.error('❌ MONGODB_URL not set in environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default dbConnect;
