import mongoose from 'mongoose';

let isConnected = false;

export const connectMongo = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    return mongoose;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });

  isConnected = true;

  return mongoose;
};

