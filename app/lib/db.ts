import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

const globalWithMongoose = global as typeof global & {
  mongoose: CachedConnection | undefined;
};

const cached: CachedConnection = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached;
}

export async function connectToDatabase(): Promise<mongoose.Mongoose> {
  if (cached.conn) {
    return Promise.resolve(mongoose);
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  cached.conn = mongoose.connection;
  return mongoose;
}
