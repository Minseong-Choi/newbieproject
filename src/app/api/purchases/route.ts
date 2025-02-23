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

    // quantity 검증
    if (!quantity || quantity <= 0 || quantity > 10) {
      return NextResponse.json(
        { message: '수량은 1개 이상 10개 이하로 입력해주세요.' }, 
        { status: 400 }
      );
    }

    await connectDB();
    const purchase = await Purchase.create({
      userId: user._id,
      userName: user.name,
      quantity
    });

    return NextResponse.json(
      { message: '구매 신청이 완료되었습니다.', purchase }
    );

  } catch (error) {
    return NextResponse.json(
      { message: '구매 신청에 실패했습니다.' }, // error -> message로 변경
      { status: 500 }
    );
  }
}