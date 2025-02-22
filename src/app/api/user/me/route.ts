import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';  // NextRequest import 추가
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {  // NextRequest 타입 지정
  try {
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }

    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    await connectDB();

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        username: user.username,
        tier: user.tier,
        score: user.score,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('User info error:', error);
    return NextResponse.json(
      { message: '사용자 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}