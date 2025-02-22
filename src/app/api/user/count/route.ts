import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const count = await User.countDocuments();
    console.log('Total users count:', count); // 로깅 추가

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error counting users:', error); // 에러 로깅 추가
    return NextResponse.json(
      { error: '회원 수를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}