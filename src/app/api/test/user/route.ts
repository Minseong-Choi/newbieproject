import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    // 테스트 사용자 데이터
    const testUser = {
      username: "testuser",
      password: "test1234",
      name: "홍길동",
      tier: "Silver",
      score: 1200
    };

    // 이미 존재하는 사용자인지 확인
    const existingUser = await User.findOne({ username: testUser.username });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: '이미 존재하는 사용자입니다.' 
      });
    }

    // 새 사용자 생성
    const user = await User.create(testUser);

    return NextResponse.json({ 
      success: true, 
      message: '테스트 사용자가 생성되었습니다.',
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        tier: user.tier,
        score: user.score
      }
    });

  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: '사용자 생성 중 오류가 발생했습니다.',
      error: (error as Error).message 
    }, { status: 500 });
  }
}