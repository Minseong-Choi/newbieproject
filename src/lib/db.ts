import mongoose from 'mongoose';

const globalAny = global as unknown as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } };
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = globalAny.mongoose ?? { conn: null, promise: null };

// MongoDB 연결 함수
export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  globalAny.mongoose = cached; // 전역 객체에 캐싱
  return cached.conn;
}
