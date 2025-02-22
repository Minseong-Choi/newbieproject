import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from './db';
import User from '@/models/User';

export async function auth(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;

  if (!token) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    await connectDB();
    
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    return user;
  } catch (error) {
    throw new Error('인증에 실패했습니다.');
  }
}