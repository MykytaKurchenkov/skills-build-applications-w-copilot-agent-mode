import mongoose from 'mongoose';

// MongoDB connection configuration for octofit_db
const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB octofit_db');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};

export const getMongoDBURI = (): string => {
  return MONGODB_URI;
};

export default {
  uri: MONGODB_URI,
  connect: connectDatabase,
  disconnect: disconnectDatabase,
  getUri: getMongoDBURI
};
