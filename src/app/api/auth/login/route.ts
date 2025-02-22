import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { username, password } = await req.json();

    // 사용자 찾기
    const user = await User.findOne({ username });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        tier: user.tier,
        score: user.score
      }
    });

    // 쿠키에 토큰 저장
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}