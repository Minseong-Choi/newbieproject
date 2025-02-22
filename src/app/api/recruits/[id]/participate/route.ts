import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Recruit from '@/models/Recruit';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await auth(req);
    const url = req.nextUrl.pathname;
    const id = url.split('/')[url.split('/').indexOf('recruits') + 1];

    const recruit = await Recruit.findById(id);
    if (!recruit) {
      return NextResponse.json(
        { error: '모집글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    if (!recruit.participants.includes(user.name)) {
      recruit.participants.push(user.name);
      await recruit.save();
    }

    return NextResponse.json(recruit);
  } catch (error) {
    console.error('Participation error:', error);
    return NextResponse.json(
      { error: '참여하기에 실패했습니다.' },
      { status: 500 }
    );
  }
}
