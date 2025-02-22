import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Recruit from '@/models/Recruit';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const recruits = await Recruit.find().sort({ createdAt: -1 });
    return NextResponse.json(recruits);
  } catch (error) {
    return NextResponse.json({ error: '모집글을 불러오는데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req);
    const { date, time, location } = await req.json();
    
    await connectDB();
    const recruit = await Recruit.create({
      author: user.name,
      date,
      time,
      location,
      participants: [user.name],
      createdBy: user._id
    });
    
    return NextResponse.json(recruit);
  } catch (error) {
    return NextResponse.json({ error: '모집글 작성에 실패했습니다.' }, { status: 500 });
  }
}