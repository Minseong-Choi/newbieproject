import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const purchases = await Purchase.find().sort({ createdAt: -1 });
    return NextResponse.json(purchases);
  } catch (error) {
    return NextResponse.json(
      { error: '구매 신청 목록을 불러오는데 실패했습니다.' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req);
    const { quantity } = await req.json();

    await connectDB();
    const purchase = await Purchase.create({
      userId: user._id,
      userName: user.name,
      quantity
    });

    return NextResponse.json(purchase);
  } catch (error) {
    return NextResponse.json(
      { error: '구매 신청에 실패했습니다.' }, 
      { status: 500 }
    );
  }
}