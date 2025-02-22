import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const mongoose = await connectDB();
    
    // 연결 상태 확인
    const connectionState = mongoose.connection.readyState;
    // 0 = 연결끊김
    // 1 = 연결됨
    // 2 = 연결중
    // 3 = 연결끊는중

    const status = {
      isConnected: connectionState === 1,
      state: connectionState,
      dbName: mongoose.connection.name,
      host: mongoose.connection.host
    };

    return NextResponse.json({ 
      success: true, 
      message: '데이터베이스 연결 성공',
      status 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: '데이터베이스 연결 실패',
      error: (error as Error).message 
    }, { status: 500 });
  }
}