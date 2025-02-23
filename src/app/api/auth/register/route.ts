import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    // DB 연결
    await connectDB();
    const { username, password, name } = await req.json();
    console.log("Received registration data:", { username, name }); // 비밀번호는 로깅하지 않음

    // 필수 필드 검증
    if (!username || !password || !name) {
      return NextResponse.json(
        { message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (username.length > 20) {
      return NextResponse.json(
        { message: '아이디는 20자 이하여야 합니다.' },
        { status: 400 }
      );
    }
    
    // 중복 사용자 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: '이미 존재하는 아이디입니다.' },
        { status: 400 }
      );
    }

    const user = await User.create({
      username,
      password,
      name,
      tier: 'Bronze',
      score: 1000
    });

    console.log("User created successfully:", user._id);

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}